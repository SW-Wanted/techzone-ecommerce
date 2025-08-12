import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css'; // Vamos criar este ficheiro a seguir

const LoginPage = () => {
  // Criar estados para guardar os valores dos campos do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede que a página recarregue ao submeter
    // Por agora, vamos apenas mostrar os dados no console
    console.log({ email, password });
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={submitHandler}>
        <h1>Entrar na Conta</h1>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Digite o seu email"
            value={email} // O valor do input é controlado pelo estado
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado quando o utilizador digita
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

        <button type="submit" className={styles.submitButton}>
          Entrar
        </button>

        <p className={styles.registerLink}>
          Novo por aqui?{' '}
          <Link to="/register">Crie uma conta</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;