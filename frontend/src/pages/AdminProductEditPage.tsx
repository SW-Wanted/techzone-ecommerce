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
  const [loadingUpload, setLoadingUpload] = useState(false);

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

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setLoadingUpload(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      // Como já configurei o proxy no vite.config.ts não há necessidade de colocar sempre o caminho completo do servidor: https://localhost:5001...
      const { data } = await axios.post(
        `/api/upload`,
        formData,
        config
      );
      
      // A única coisa que esta função faz é atualizar o estado da imagem.
      setImage(data.image);
      setLoadingUpload(false);
    } catch (error) {
      console.error(error);
      setError('Falha no upload da imagem.'); // Dar feedback de erro ao utilizador
      setLoadingUpload(false);
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
          <label>Imagem do Produto</label>
          
          {/* Mostra a imagem atual */}
          <div className={styles.imagePreview}>
            <img src={image} alt="Pré-visualização do produto" />
          </div>

          {/* Campo de texto para ver o caminho da imagem (opcional, pode ser read-only) */}
          <input
            type="text"
            placeholder="Caminho da imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            readOnly // Boa prática para evitar edição manual confusa
          />
          
          {/* Campo de upload de ficheiro */}
          <input type="file" id="image-file" label="Escolher Ficheiro" onChange={uploadFileHandler} />
          {loadingUpload && <p>A carregar imagem...</p>}
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