const express = require('express');
const { sendMessage } = require('../controllers/iaController');  // Importa a função sendMessage do controlador

const router = express.Router();  // Inicializa o roteador do Express

// Define a rota POST para /api/chat, que envia a mensagem para a IA
router.post('/', sendMessage);

module.exports = router;  // Exporta o roteador para ser usado em outros arquivos
