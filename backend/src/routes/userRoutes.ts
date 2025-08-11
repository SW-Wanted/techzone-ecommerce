import express, { Request, Response } from 'express';
import User from '../models/userModel';

const router = express.Router();

// @desc    Registar um novo utilizador
// @route   POST /api/users/register
// @access  Public
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // 1. Verificar se os campos obrigatórios foram enviados
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    // 2. Verificar se o utilizador já existe
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Este email já está a ser utilizado.' });
    }

    // 3. Criar o novo utilizador no sistema
    // A password será automaticamente encriptada pelo nosso middleware no userModel
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      // 4. Se o utilizador foi criado com sucesso, enviar os dados de volta (sem a password)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400).json({ message: 'Dados de utilizador inválidos.' });
    }
  } catch (error) {
     if (error instanceof Error) {
        res.status(500).json({ message: "Erro no servidor", error: error.message });
     } else {
        res.status(500).json({ message: "Ocorreu um erro desconhecido." });
     }
  }
});


export default router;