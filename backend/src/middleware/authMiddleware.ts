// backend/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel';

// Interface para estender o objeto Request do Express e adicionar a nossa propriedade 'user'
export interface AuthRequest extends Request {
  user?: { // A propriedade 'user' será opcional
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // 1. Ler o token JWT do header 'Authorization'
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      // 2. Extrair o token do header (formato: "Bearer TOKEN")
      token = authHeader.split(' ')[1];

      // 3. Verificar se o token é válido usando o nosso segredo
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      // 4. Se o token for válido, obter os dados do utilizador a partir do ID no token
      // e anexá-los ao objeto 'req' para que as rotas seguintes possam usá-los.
      // Excluímos a password da seleção por segurança.
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Chamar next() para passar o controlo para o próximo middleware ou rota
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Não autorizado, token falhou' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, sem token' });
  }
};