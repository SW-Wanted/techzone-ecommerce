// frontend/src/components/ProductCard.tsx

import React from 'react';

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
    <div className="product-card">
      <img src={product.image || 'https://aiwa.vtexassets.com/arquivos/ids/156402-800-800?v=638839454688430000&width=800&height=800&aspect=true'} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">Kz {product.price.toLocaleString()}</p>
      <p>{product.brand}</p>
    </div>
  );
};

export default ProductCard;