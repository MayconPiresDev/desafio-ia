import React, { useState } from 'react';
import { sendMessageToAI } from '../services/ApiService';  // Função de serviço que envia a mensagem para o backend
import Avatar from './Avatar';
import './Chat.css';  // Importa o arquivo CSS para estilização

const Chat = () => {
  const [messages, setMessages] = useState([]);  // Armazena todas as mensagens no frontend (histórico)
  const [input, setInput] = useState('');  // Armazena a mensagem atual

  // Função para enviar a mensagem ao backend
  const handleSendMessage = async () => {
    if (input.trim() === '') return;  // Se o campo estiver vazio, não faça nada

    // Atualiza o histórico local no frontend com a mensagem do usuário
    const newHistory = [...messages, { role: 'user', content: input }];

    try {
      // Envia a mensagem para o backend junto com o histórico
      const response = await sendMessageToAI(input, newHistory);

      // Atualiza o histórico local com a resposta da IA
      setMessages([...newHistory, { role: 'assistant', content: response.response }]);
      setInput('');  // Limpa o campo de entrada de texto
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      // Tratar erro ao enviar mensagem
    }
  };

  // Função para capturar a tecla Enter e enviar a mensagem
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();  // Previne o comportamento padrão do Enter (como enviar um formulário)
      handleSendMessage();  // Chama a função para enviar a mensagem
    }
  };

  return (
    <div className="chat-container">
      <Avatar />
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index} className={msg.role === 'user' ? 'user-message' : 'ai-message'}>
            {msg.content}
          </p>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}  // Captura o evento de tecla "Enter"
          placeholder="Digite sua mensagem..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">Enviar</button> {/* Envia ao clicar no botão */}
      </div>
    </div>
  );
};

export default Chat;
