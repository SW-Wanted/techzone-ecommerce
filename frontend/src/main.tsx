import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Importar o Layout e componente
import AppLayout from "./layouts/AppLayout.tsx";
import AdminRoute from "./components/routing/AdminRoute.tsx";

// Importar as páginas
import HomePage from "./pages/HomePage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.tsx";
import AdminProductListPage from "./pages/AdminProductListPage.tsx";
import AdminProductEditPage from './pages/AdminProductEditPage.tsx';
import "./index.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // --- Rotas Públicas ---
      { path: "/", element: <HomePage /> },
      { path: "/product/:id", element: <ProductDetailPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },

      // --- Rotas de Admin (Protegidas) ---
      // Criar uma nova rota "pai" que usa o AdminRoute como elemento.
      // Qualquer rota aninhada aqui dentro estará protegida.
      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          { path: "dashboard", element: <AdminDashboardPage /> },
          { path: 'products', element: <AdminProductListPage /> },
          { path: 'product/:id/edit', element: <AdminProductEditPage /> }
          // Em breve: { path: 'users', element: <AdminUserListPage /> }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
