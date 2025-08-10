const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Permite a comunicação entre o frontend e o backend
app.use(express.json()); // Permite que o express entenda JSON

// Ligacao a base de dados
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
	.then(() => {
		console.log('Conectando ao MongoDB Atlas com sucesso!');
	})
	.catch((error) => {
		console.log('Erro ao conectar ao MongoDB Atlas:', error.message);
	});

// Rota de teste da API
app.get('/api/test', (req, res) => {
	res.json({message: 'Olá do Backend! A conexão está a funcionar.'});
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
	console.log('The server is running in the port ${PORT}');
});
