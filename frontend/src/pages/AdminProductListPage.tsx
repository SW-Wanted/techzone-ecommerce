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

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- NOVA LÓGICA DE APAGAR ---
  const deleteHandler = async (id: string) => {
    // 1. Pedir confirmação ao utilizador
    if (window.confirm('Tem a certeza que quer apagar este produto?')) {
      try {
        // 2. Configurar os headers para enviar o token de autenticação
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };

        // 3. Enviar o pedido DELETE para a nossa API protegida
        await axios.delete(`http://localhost:5001/api/products/${id}`, config);

        // 4. Atualizar a lista de produtos no frontend sem recarregar
        // Filtramos o produto apagado do nosso estado atual
        setProducts(products.filter((p) => p._id !== id));
        
        // Alternativa: Recarregar a lista do zero
        // fetchProducts();

      } catch (err: any) {
        setError(err.response?.data?.message || 'Erro ao apagar o produto.');
      }
    }
  };

  const createProductHandler = () => {
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
      
      {/* Adicionar um estado de loading/erro para a operação de apagar */}
      {error && <p className={styles.error}>{error}</p>}
      {loading && <p>A carregar...</p>}
      
      {/* Tabela de produtos */}
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
                {/* Ligar a nossa nova função ao evento onClick */}
                <button
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => deleteHandler(product._id)}
                >
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductListPage;