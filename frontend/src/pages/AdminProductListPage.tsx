import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './AdminProductListPage.module.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
}

const AdminProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5001/api/products');
        setProducts(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao carregar produtos.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const createProductHandler = () => {
    // Lógica para criar um produto virá numa issue futura
    console.log('Criar novo produto');
  };

  return (
    <div className={styles.productListContainer}>
      <div className={styles.header}>
        <h1>Produtos</h1>
        <button className={styles.createButton} onClick={createProductHandler}>
          + Criar Produto
        </button>
      </div>

      {loading ? (
        <p>A carregar...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>PREÇO</th>
              <th>CATEGORIA</th>
              <th>MARCA</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>Kz {product.price.toLocaleString()}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`} className={`${styles.actionButton} ${styles.editButton}`}>
                    Editar
                  </Link>
                  <button className={`${styles.actionButton} ${styles.deleteButton}`}>
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProductListPage;