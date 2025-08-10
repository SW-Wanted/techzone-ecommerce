// backend/routes/productRoutes.js

const express = require('express');
const Product = require('../models/productModel'); // Importar o nosso model

const router = express.Router();

// ROTA: Obter todos os produtos
// @route   GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// ROTA: Obter um produto por ID
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
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

// --- NOVAS ROTAS ---

// ROTA: Criar um novo produto
// @route   POST /api/products
router.post('/', async (req, res) => {
  try {
    // A informação do novo produto virá no corpo do pedido (req.body)
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      // Podemos adicionar valores padrão ou deixar que o model trate disso
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct); // 201 significa "Created"
  } catch (error) {
    // Erros de validação do Mongoose caem aqui
    res.status(400).json({ message: 'Dados do produto inválidos', error: error.message });
  }
});

// ROTA: Atualizar um produto existente
// @route   PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, price, brand, category, countInStock, description, image } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;
      product.description = description || product.description;
      product.image = image || product.image;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Dados do produto inválidos', error: error.message });
  }
});

// ROTA: Apagar um produto
// @route   DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
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


module.exports = router;