// frontend/src/pages/RegisterPage.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css'; // Usaremos um estilo dedicado

const RegisterPage = () => {
  // Adicionar estados para os novos campos
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // Para mostrar mensagens de erro

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificação simples no frontend
    if (password !== confirmPassword) {
      setMessage('As passwords não coincidem!');
    } else {
      setMessage(''); // Limpar a mensagem se estiver tudo bem
      // Por agora, apenas mostrar os dados
      console.log({ name, email, password });
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={submitHandler}>
        <h1>Criar Conta</h1>

        {message && <p className={styles.errorMessage}>{message}</p>}

        <div className={styles.formGroup}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            placeholder="Digite o seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Digite o seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Digite a sua password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirmar Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirme a sua password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Registar
        </button>

        <p className={styles.loginLink}>
          Já tem uma conta?{' '}
          <Link to="/login">Entre aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;