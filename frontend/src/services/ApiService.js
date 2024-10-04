const API_URL = 'http://localhost:5000/api/chat';  // URL do backend

// Função que envia a mensagem e o histórico da conversa para o backend
export const sendMessageToAI = async (message, conversationHistory) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,  // A mensagem atual do usuário
        conversationHistory,  // O histórico completo da conversa
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    const data = await response.json();
    return data;  // Retorna a resposta do backend
  } catch (error) {
    console.error('Erro ao comunicar com a IA:', error);
    return { response: 'Erro ao comunicar com a IA' };
  }
};
