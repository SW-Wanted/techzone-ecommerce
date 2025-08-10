// backend/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// --- IMPORTAR ROTAS ---
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB Atlas:', error.message));

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'Olá do Backend! A conexão está a funcionar.' });
});

// --- USAR AS ROTAS ---
// Diz ao Express que qualquer pedido que comece com /api/products
// deve ser tratado pelo productRoutes.
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});