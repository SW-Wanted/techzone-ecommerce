import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do .env

import productRoutes from './routes/productRoutes';

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

const PORT: string | number = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});