const axios = require('axios');  // Importa a biblioteca axios para fazer requisições HTTP
const dialogflow = require('@google-cloud/dialogflow');  // Importa a biblioteca DialogFlow para fallback
const { v4: uuidv4 } = require('uuid');  // Importa biblioteca para gerar IDs únicos de sessão
require('dotenv').config();  // Carrega as variáveis de ambiente do .env

// Variável para rastrear se a OpenAI excedeu a cota
let isUsingDialogFlow = false;

// Função responsável por enviar a mensagem do usuário para a IA e manter o histórico da conversa
const sendMessage = async (req, res) => {
  const { message, conversationHistory } = req.body;  // Extrai a mensagem e o histórico da conversa do corpo da requisição
  let updatedHistory = conversationHistory || [];  // Se o histórico não existir, inicializa um novo

  // Adiciona a mensagem do usuário ao histórico
  updatedHistory.push({ role: 'user', content: message });

  try {
    if (isUsingDialogFlow) {
      // Se estiver usando o DialogFlow, faz a requisição diretamente para o DialogFlow
      const dialogflowResponse = await sendToDialogFlow(message, updatedHistory);
      res.json({ response: dialogflowResponse, conversationHistory: updatedHistory });
    } else {
      // Faz a requisição POST para a API da OpenAI
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',  // Modelo GPT-3.5 utilizado
          messages: updatedHistory  // Envia o histórico completo para a OpenAI
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,  // Chave da API OpenAI do arquivo .env
            'Content-Type': 'application/json',
          }
        }
      );

      // Extrai a resposta da IA e adiciona ao histórico
      const aiResponse = response.data.choices[0].message.content;
      updatedHistory.push({ role: 'assistant', content: aiResponse });

      // Retorna a resposta da IA e o histórico atualizado para o frontend
      res.json({ response: aiResponse, conversationHistory: updatedHistory });
    }
  } catch (error) {
    // Verifica se o erro é por falta de cota na OpenAI (exemplo de código de erro)
    if (error.response && error.response.status === 429) {
      console.error('Cota da OpenAI excedida. Alternando para DialogFlow full-time...');

      // Fallback para DialogFlow
      try {
        isUsingDialogFlow = true;  // Define para usar apenas o DialogFlow
        const dialogflowResponse = await sendToDialogFlow(message, updatedHistory);  // Chama a função para enviar ao DialogFlow com o histórico
        res.json({ response: dialogflowResponse, conversationHistory: updatedHistory });
      } catch (dialogflowError) {
        console.error('Erro ao comunicar com o DialogFlow:', dialogflowError);
        res.status(500).json({ error: 'Erro ao comunicar com a IA e DialogFlow' });
      }
    } else {
      // Tratamento de erros ao se comunicar com a OpenAI
      console.error('Erro ao comunicar com a OpenAI:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Erro ao comunicar com a IA' });
    }
  }
};

// Função para enviar a mensagem ao DialogFlow caso a OpenAI falhe ou esteja sendo usada exclusivamente
const sendToDialogFlow = async (message, conversationHistory) => {
  // Cria uma nova instância do cliente DialogFlow
  const sessionClient = new dialogflow.SessionsClient({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Corrige o \n para evitar erros de quebra de linha no JSON
    }
  });

  // Gera dinamicamente o ID da sessão para manter o contexto de cada usuário
  const sessionId = uuidv4();

  // Configurações da sessão do DialogFlow
  const sessionPath = sessionClient.projectAgentSessionPath(
    process.env.GOOGLE_PROJECT_ID,  // ID do projeto no Google Cloud
    sessionId  // ID da sessão, gerado dinamicamente
  );

  // Monta o histórico da conversa para o DialogFlow
  const textMessage = conversationHistory
    .map((msg) => (msg.role === 'user' ? `Usuário: ${msg.content}` : `Assistente: ${msg.content}`))
    .join('\n') + `\nUsuário: ${message}`;

  // Configuração da requisição ao DialogFlow
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: textMessage,  // A mensagem e o histórico da conversa enviados ao DialogFlow
        languageCode: 'pt-BR',  // Idioma da interação
      },
    },
  };

  // Envia a requisição ao DialogFlow e aguarda a resposta
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult.fulfillmentText;

  // Adiciona a resposta do DialogFlow ao histórico
  conversationHistory.push({ role: 'assistant', content: result });

  return result;  // Retorna a resposta gerada pelo DialogFlow
};

// Função para verificar se o GPT-3 está disponível novamente
const checkOpenAIAvailability = async () => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Teste de disponibilidade' }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    // Se a requisição for bem-sucedida, desativa o uso do DialogFlow
    if (response.status === 200) {
      isUsingDialogFlow = false;  // OpenAI está disponível novamente
      console.log("OpenAI disponível novamente.");
    }
  } catch (error) {
    console.log("OpenAI ainda está indisponível, continuando com o DialogFlow.");
  }
};

// Função para verificar periodicamente a disponibilidade do GPT-3
setInterval(checkOpenAIAvailability, 60000);  // Verifica a cada 60 segundos

module.exports = { sendMessage };  // Exporta a função para ser usada nas rotas
