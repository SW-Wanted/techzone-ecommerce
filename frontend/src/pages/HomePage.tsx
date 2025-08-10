import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import styles from './HomePage.module.css'; // 1. Importa o módulo de estilos

// ... (Interface Product) ...
interface Product {
  _id: string;
  name: string;
  image?: string;
  price: number;
  brand: string;
}


const HomePage = () => {
  // ... (Lógica de useState e useEffect) ...
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:5001/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Não foi possível carregar os produtos.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <h1>A carregar produtos...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <main>
      <h2>Nossos Produtos</h2>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default HomePage;