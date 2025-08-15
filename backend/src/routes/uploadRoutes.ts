import path from 'path';
import express, { Request } from 'express';
import multer from 'multer';
import { protect, admin } from '../middleware/authMiddleware'

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Onde guardar
  },
  filename(req, file, cb) {
    // Criar um nome de ficheiro único para evitar conflitos
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Função para verificar o tipo de ficheiro
function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Apenas imagens (jpg, jpeg, png) são permitidas!'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

// @route   POST /api/upload
// @desc    Rota para fazer upload de uma imagem
router.post('/', protect, admin, upload.single('image'), (req: Request, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Por favor, faça o upload de um ficheiro de imagem.' });
  }
  // Devolve o caminho do ficheiro guardado
  res.status(200).send({
    message: 'Imagem carregada com sucesso',
    image: `/${req.file.path}`,
  });
});

export default router;