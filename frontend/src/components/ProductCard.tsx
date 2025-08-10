import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

// 1. Definir o "tipo" para um produto. Isto garante que só recebemos os dados corretos.
interface Product {
  _id: string;
  name: string;
  image?: string; // O '?' torna a propriedade opcional
  price: number;
  brand: string;
}

// 2. Definir o "tipo" para as props que o nosso componente recebe.
interface ProductCardProps {
  product: Product;
}

// 3. Usar o tipo nas props do componente.
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className={styles.productCard}>
        <img src={product.image || 'https://aiwa.vtexassets.com/arquivos/ids/156402-800-800?v=638839454688430000&width=800&height=800&aspect=true'} alt={product.name} />
        <div className={styles.cardContent}>
          <h3>{product.name}</h3>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.price}>Kz {product.price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;