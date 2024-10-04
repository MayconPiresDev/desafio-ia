# Desafio Técnico – Conversa com IA e Avatar

## Descrição Geral
O objetivo deste desafio é desenvolver uma aplicação simples de chat onde o usuário possa conversar com uma IA interativa e visualizar um avatar animado que reage conforme as respostas da IA. Este teste visa avaliar suas habilidades em front-end, back-end, integração de APIs e sincronia de animações.

## Objetivos Técnicos

### Front-end:
- Criar uma interface de chat que permita ao usuário:
  1. Inserir uma mensagem em um campo de texto.
  2. Enviar a mensagem clicando em um botão.
  3. Visualizar a resposta da IA.
  4. Ver um avatar que sincroniza suas animações com as respostas da IA.

### Back-end:
- Criar uma API que receba as mensagens do front-end e envie para uma API de IA (como OpenAI GPT ou DialogFlow).
- Retornar a resposta da IA ao front-end.

### Integração com Avatar:
- Utilizar uma API de avatar (como Ready Player Me ou Alter) para gerar um avatar 3D ou animado.
- Sincronizar o avatar com as respostas da IA, de forma que ele mostre movimentos labiais ou expressões faciais simples.

## Instruções para Implementação

### Passo 1: Configuração Inicial
- Faça o fork deste repositório.
- Clone o repositório para sua máquina local:

### Passo 2: Front-end
- Utilize o framework React ou React Native para o desenvolvimento do front-end.
- Crie a interface de chat que permita o envio e recebimento de mensagens.
- Use uma biblioteca como axios ou fetch para fazer chamadas à API do back-end.

### Passo 3: Back-end
- Escolha Node.js com Express ou Python com FastAPI.
Crie um endpoint POST /mensagem que:
- Receba a mensagem do front-end.
- Envie a mensagem para uma API de IA (ex: OpenAI GPT, Gemini).
- Retorne a resposta da IA ao front-end.

  Observação Importante 1:
  Crédito Gratuito Inicial: A OpenAI e a DialogFlow oferecem créditos gratuitos para novos usuários, o que deve ser suficiente para que os desenvolvedores completem o teste.
  Porém, qualquer plataforma de IA poderá ser utilizada.
  
### Passo 4: Integração com Avatar
- Utilize uma API de avatar como Ready Player Me ou Alter.
- Sincronize as animações do avatar com as respostas da IA. Por exemplo, quando a IA responder, o avatar deve movimentar os lábios ou expressar emoções.

  Observaçao Importante 2:
  Ready Player Me ou Alter: Totalmente gratuito para criação e uso de avatares.
  Porém, qualquer plataforma poderá ser utilizada.
  
### Critérios de Avaliação
- Funcionalidade:
  O chat funciona corretamente? O usuário consegue interagir com a IA e o avatar reage de forma apropriada?
- Qualidade do Código:
  O código está bem estruturado, organizado e fácil de entender?
- Boas práticas de programação, modularização e legibilidade são valorizadas.
- Usabilidade:
  A interface é intuitiva e funcional?
  A experiência do usuário é fluida?
  
### Documentação
O README contém instruções claras para rodar o projeto localmente?
O processo de instalação e configuração está bem documentado?

### Como Obter as Chaves de API
IA (OpenAI GPT ou DialogFlow)
Para OpenAI GPT:
Acesse OpenAI e crie uma conta.
Gere sua chave de API.

Exemplo de como usar a chave da OpenAI no back-end (Node.js):
const axios = require('axios');
const apiKey = 'SUA_CHAVE_AQUI';


`async function obterRespostaDaIA(mensagem) {
  const response = await axios.post('https://api.openai.com/v1/completions', {
    prompt: mensagem,
    max_tokens: 60,
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  return response.data.choices[0].text;
}`

### Avatar (Ready Player Me ou Alter)
- Para Ready Player Me:
Acesse Ready Player Me (https://readyplayer.me/pt) e siga as instruções para gerar seu avatar 3D.

- Para Alter:
Acesse Alter (https://github.com/facemoji) e siga as instruções para obter sua chave e gerar um avatar.

### Entrega
Após finalizar o teste, faça um pull request para o repositório original com sua solução.
Inclua qualquer informação adicional relevante no PR.

### Prazo
O prazo para entrega é de 7-10 dias a partir do recebimento deste teste.


# desafio-ia
