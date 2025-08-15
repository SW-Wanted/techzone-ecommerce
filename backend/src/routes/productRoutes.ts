import express, { Request, Response } from 'express';
import Product from '../models/productModel';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// --- ROTAS PÚBLICAS (NÃO PROTEGIDAS) ---

// @desc    Busca todos os produtos
// @route   GET /api/products
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// @desc    Busca um único produto por ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// --- ROTAS PRIVADAS (PROTEGIDAS) ---

// @desc    Cria um novo produto
// @route   POST /api/products
// @access  Private/Admin (ainda por proteger)

router.post('/', protect, admin, async (req: Request, res: Response) => {
  try {

    if (!req.user) {
      return res.status(401).json({message: 'Não autorizado'});
    }
    
    const product = new Product({
      name: req.body.name || 'Sample Name',
      price: req.body.price || 0,
      brand: req.body.brand || 'Sample Brand',
      category: req.body.category || 'Sample Category',
      countInStock: req.body.countInStock || 0,
      numReviews: req.body.numReviews || 0,
      rating: req.body.rating || 0,
      description: req.body.description || 'Sample Description',
      image: req.body.image || '/images/sample.jpg',
      user: req.user?._id // Assumindo que o utilizador que cria o produto é o utilizador autenticado
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ message: 'Dados do produto inválidos', error: error.message });
    } else {
        res.status(400).json({ message: 'Ocorreu um erro desconhecido.' });
    }
  }
});

// @desc    Atualiza um produto existente
// @route   PUT /api/products/:id
// @access  Private/Admin (ainda por proteger)
router.put('/:id', protect, admin, async (req: Request, res: Response) => {
  try {
    const { name, price, brand, category, countInStock, description, image } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price ?? product.price; // Usar ?? para permitir o valor 0
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock ?? product.countInStock;
      product.description = description || product.description;
      product.image = image || product.image;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ message: 'Dados do produto inválidos', error: error.message });
    } else {
        res.status(400).json({ message: 'Ocorreu um erro desconhecido.' });
    }
  }
});

// @desc    Apaga um produto
// @route   DELETE /api/products/:id
// @access  Private/Admin (ainda por proteger)
router.delete('/:id', protect, admin, async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (product) {
      res.json({ message: 'Produto removido com sucesso' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

export default router;