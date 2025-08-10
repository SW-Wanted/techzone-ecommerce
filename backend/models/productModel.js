// backend/models/productModel.js

const mongoose = require('mongoose');

// O Schema define a estrutura dos documentos dentro de uma coleção.
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor, insira o nome do produto.'], // O campo é obrigatório
      trim: true, // Remove espaços em branco no início e no fim
    },
    description: {
      type: String,
      required: [true, 'Por favor, insira a descrição do produto.'],
    },
    price: {
      type: Number,
      required: [true, 'Por favor, insira o preço do produto.'],
      default: 0, // Valor padrão caso não seja fornecido
    },
    image: {
      type: String, // Vamos guardar o URL da imagem
      required: false, // Pode ser adicionada depois
    },
    category: {
      type: String,
      required: [true, 'Por favor, insira a categoria do produto.'],
    },
    brand: {
      type: String,
      required: [true, 'Por favor, insira a marca do produto.'],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    // A opção timestamps adiciona automaticamente os campos createdAt e updatedAt
    timestamps: true,
  }
);

// O Model é um wrapper sobre o Schema que fornece uma interface
// para a base de dados para criar, ler, atualizar e apagar documentos.
const Product = mongoose.model('Product', productSchema);

module.exports = Product;