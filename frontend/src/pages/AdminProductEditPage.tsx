// frontend/src/pages/AdminProductEditPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './AdminProductEditPage.module.css';

const AdminProductEditPage = () => {
  const { id: productId } = useParams(); // Obter o ID do produto do URL
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5001/api/products/${productId}`);
        // Preencher os estados com os dados do produto
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
      } catch (err) {
        setError('Produto não encontrado.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await axios.put(
        `http://localhost:5001/api/products/${productId}`,
        { name, price, image, brand, category, countInStock, description },
        config
      );
      
      navigate('/admin/products'); // Redirecionar após sucesso
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao atualizar o produto.');
      setLoadingUpdate(false);
    }
  };

  if (loading) return <p>A carregar dados do produto...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.editContainer}>
      <Link to="/admin/products" className={styles.backButton}>
        &larr; Voltar para a Lista
      </Link>
      <form className={styles.editForm} onSubmit={submitHandler}>
        <h1>Editar Produto</h1>
        {loadingUpdate && <p>A atualizar...</p>}

        <div className={styles.formGroup}>
          <label>Nome</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Preço</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </div>
        <div className={styles.formGroup}>
          <label>URL da Imagem</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Marca</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Categoria</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Quantidade em Stock</label>
          <input type="number" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} />
        </div>
        <div className={styles.formGroup}>
          <label>Descrição</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4}></textarea>
        </div>
        
        <button type="submit" disabled={loadingUpdate} className={styles.submitButton}>
          Atualizar Produto
        </button>
      </form>
    </div>
  );
};

export default AdminProductEditPage;