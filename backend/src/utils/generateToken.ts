import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateToken = (userId: Types.ObjectId) => {
    const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('O segredo do JWT não está definido. Verifique a variável de ambiente JWT_SECRET.');
  }
  // O token irá conter o ID do utilizador como "payload"
  // e irá expirar em 30 dias.
  return jwt.sign({ id: userId }, secret, {
    expiresIn: '30d',
  });
}

export default generateToken;