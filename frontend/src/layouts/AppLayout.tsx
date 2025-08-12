import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './AppLayout.module.css';

const AppLayout = () => {
  const { userInfo } = useAuth();

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>
            <Link to="/">TechZone</Link>
          </h1>
          <nav className={styles.nav}>
            {userInfo ? (
              <>
                <span className={styles.welcomeMessage}>Bem-vindo, {userInfo.name}!</span>
                {/* O botão de logout virá na próxima issue */}
                <button className={styles.navButton}>Logout</button> 
              </>
            ) : (
              <>
                <Link to="/login" className={styles.navLink}>Login</Link>
                <Link to="/register" className={styles.navLink}>Registar</Link>
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