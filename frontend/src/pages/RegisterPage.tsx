// frontend/src/pages/RegisterPage.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Estado para erros da API
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, userInfo } = useAuth(); // O registo vai fazer login automaticamente

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As passwords não coincidem!');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // A API de registo não retorna um token, então temos que fazer o login a seguir
      await axios.post(
        'http://localhost:5001/api/users/register',
        { name, email, password },
        config
      );

      // Após o registo bem-sucedido, fazemos o login automaticamente
      const { data } = await axios.post(
        'http://localhost:5001/api/users/login',
        { email, password },
        config
      );
      
      login(data); // Usa a função do contexto para fazer login
      navigate('/'); // Redireciona

    } catch (err: any) {
      setError(err.response?.data?.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={submitHandler}>
        <h1>Criar Conta</h1>
        
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        {/* ... (resto do formulário) ... */}
        <div className={styles.formGroup}>
            <label htmlFor="name">Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmar Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'A registar...' : 'Registar'}
        </button>

        <p className={styles.loginLink}>
          Já tem uma conta? <Link to="/login">Entre aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;