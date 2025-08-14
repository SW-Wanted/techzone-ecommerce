import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path'; // Módulo nativo do Node.js

dotenv.config(); // Carrega as variáveis de ambiente do .env

import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import uploadRoutes from './routes/uploadRoutes';

const app: Express = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('ERRO: A variável de ambiente MONGO_URI não está definida.');
  process.exit(1); // Encerra o processo se a connection string não existir
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB Atlas:', error.message));

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'Olá do Backend! A conexão está a funcionar.' });
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
// --- TORNAR A PASTA DE UPLOADS ESTÁTICA ---
// process.cwd() retorna o diretório onde o comando 'npm' foi executado,
// que neste caso é a raiz da pasta 'backend'.
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const PORT: string | number = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});