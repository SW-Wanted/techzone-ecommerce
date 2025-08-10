// backend/routes/productRoutes.js

const express = require('express');
const Product = require('../models/productModel'); // Importar o nosso model

const router = express.Router();

// ROTA 1: Obter todos os produtos
// @desc    Busca todos os produtos
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}); // O objeto vazio {} significa "encontrar todos"
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// ROTA 2: Obter um produto por ID
// @desc    Busca um único produto
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      // Se o ID tiver o formato correto mas não existir na base de dados
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;