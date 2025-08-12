import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetailPage.module.css'; 

// ... (Interface Product) ...
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  brand: string;
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:5001/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Produto não encontrado ou erro no servidor.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <h1>A carregar detalhes do produto...</h1>;
  if (error) return <h1>{error}</h1>;
  if (!product) return <h1>Produto não encontrado.</h1>;

  return (
    // 2. Aplica as classes importadas a cada elemento
    <div className={styles.productDetailsContainer}>
      <div className={styles.productImage}>
        <img src={product.image || 'https://aiwa.vtexassets.com/arquivos/ids/156402-800-800?v=638839454688430000&width=800&height=800&aspect=true'} alt={product.name} />
      </div>
      <div className={styles.productInfo}>
        <h1>{product.name}</h1>
        <p className={styles.price}>Kz {product.price.toLocaleString()}</p>
        <p><strong>Marca:</strong> {product.brand}</p>
        <p><strong>Categoria:</strong> {product.category}</p>
        <p><strong>Descrição:</strong> {product.description}</p>
        <p><strong>Em stock:</strong> {product.countInStock > 0 ? 'Disponível' : 'Esgotado'}</p>
        <p><strong>Avaliação:</strong> {product.rating} ({product.numReviews} avaliações)</p>
        <button className={styles.addToCartBtn}>Adicionar ao Carrinho</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;