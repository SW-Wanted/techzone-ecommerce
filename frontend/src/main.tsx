import React from "react"; // React deve ser importado
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./AppLayout.module.css"; // Importar os estilos do layout

// Importar as páginas e o CSS
import HomePage from "./pages/HomePage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx"
import "./index.css";

// Componente de Layout (pode estar no seu próprio ficheiro, ex: layouts/AppLayout.tsx)
const AppLayout = () => {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <h1><Link to="/">TechZone</Link></h1>
      </header>
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      }
    ],
  },
]);

// O ficheiro App.tsx original não é mais necessário aqui, pois o router controla o que é renderizado.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
