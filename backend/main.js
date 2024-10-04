require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const chatRoutes = require('./routes/chat');

const app = express();

// Middleware para CORS e JSON
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/chat', chatRoutes);

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Qualquer rota que não seja da API deve retornar o arquivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
