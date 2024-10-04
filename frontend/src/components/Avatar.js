import React, { useEffect } from 'react';
import './Avatar.css';  // Importa o arquivo CSS para estilização do avatar

const Avatar = () => {
  // URL do avatar personalizado com Frame API ativada
  const avatarURL = 'https://readyplayer.me/avatar/66f5616ce405ebb02f7cc11d?frameApi';  

  useEffect(() => {
    // Carrega o script para permitir a integração com a Frame API do Ready Player Me
    const script = document.createElement('script');
    script.src = 'https://cdn.readyplayer.me/readyplayerme.js';
    script.async = true;
    document.body.appendChild(script);

    // Ativa o comunicador do Ready Player Me para possíveis interações futuras
    script.onload = () => {
      window.ReadyPlayerMeCommunicator();  // Inicia o comunicador da API
    };

    // Função para receber mensagens da API do avatar
    window.addEventListener('message', (event) => {
      if (event.data.source === 'readyplayerme') {
        console.log('Avatar Loaded:', event.data.url);  // Loga quando o avatar é carregado
      }
    });
  }, []);

  return (
    <div className="avatar-container">
      {/* Renderiza o iframe com o avatar personalizado */}
      <iframe
        id="avatar-iframe"
        src={avatarURL}
        title="Ready Player Me Avatar"
        className="avatar-iframe"
        allow="camera *; microphone *"
      />
    </div>
  );
};

export default Avatar;
