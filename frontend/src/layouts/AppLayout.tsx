import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './AppLayout.module.css';

const AppLayout = () => {
  // Obter tudo o que precisamos do nosso contexto de autenticação
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>
            <Link to="/">TechZone</Link>
          </h1>
          <nav className={styles.nav}>
            {userInfo ? (
              // Vista para utilizador logado
              <>
                <span className={styles.welcomeMessage}>Bem-vindo, {userInfo.name}!</span>
                <button onClick={logoutHandler} className={styles.navButton}>
                  Logout
                </button>
              </>
            ) : (
              // Vista para visitante
              <>
                <Link to="/login" className={styles.navLink}>
                  Login
                </Link>
                <Link to="/register" className={styles.navLink}>
                  Registar
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;