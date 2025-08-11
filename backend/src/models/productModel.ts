import mongoose, { Document, Model, Types } from 'mongoose';

// 1. Definir uma interface para as avaliações (Reviews), pois elas são um subdocumento.
interface IReview extends Document {
  user: Types.ObjectId; // Referência ao utilizador que fez a avaliação
  name: string;
  rating: number;
  comment: string;
}

// 2. Criar um Schema para as avaliações que será usado dentro do Product Schema.
const reviewSchema = new mongoose.Schema<IReview>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Cria uma relação com o modelo 'User'
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


// 3. Definir a interface principal para as propriedades de um Produto.
// Incluímos as avaliações como um array do tipo da interface que criámos.
interface IProduct extends Document {
  user: Types.ObjectId; // Referência ao admin que criou o produto
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: IReview[]; // Array de subdocumentos de avaliação
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}


// 4. Criar o Schema do Produto, usando a nossa interface IProduct.
const productSchema = new mongoose.Schema<IProduct>(
  {
    // Adicionamos uma referência ao utilizador que criou o produto.
    // Isto será útil para o painel de administração.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: '/images/sample.jpg', // Adicionar um valor padrão para a imagem
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema], // Usar o schema de avaliações que definimos
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


// 5. Criar e exportar o Modelo do Produto.
const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);

export default Product;