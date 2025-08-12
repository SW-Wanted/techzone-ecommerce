// frontend/src/pages/LoginPage.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Para aceder à função de login
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para guardar mensagens de erro da API
  const [loading, setLoading] = useState(false); // Estado para feedback de loading

  const navigate = useNavigate();
  const { login, userInfo } = useAuth(); // Obter a função de login e os dados do utilizador do contexto

  // Se o utilizador já estiver logado, redireciona para a página inicial
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Configuração do pedido para a API
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Fazer o pedido POST para a rota de login do backend
      const { data } = await axios.post(
        'http://localhost:5001/api/users/login',
        { email, password },
        config
      );

      // Se o pedido for bem-sucedido, chama a função de login do nosso contexto
      login(data);

      // Redireciona o utilizador para a página inicial
      navigate('/');

    } catch (err: any) {
      // Se a API retornar um erro, mostra a mensagem
      setError(err.response?.data?.message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={submitHandler}>
        <h1>Entrar na Conta</h1>

        {error && <p className={styles.errorMessage}>{error}</p>}
        
        {/* ... (o resto do formulário continua igual, mas vamos adicionar feedback de loading) ... */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'A entrar...' : 'Entrar'}
        </button>

        <p className={styles.registerLink}>
          Novo por aqui? <Link to="/register">Crie uma conta</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;