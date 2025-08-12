// frontend/src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Importar o Layout
import AppLayout from "./layouts/AppLayout.tsx"; // <-- Importar o componente

// Importar as páginas
import HomePage from "./pages/HomePage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import "./index.css";


const router = createBrowserRouter([
  {
    element: <AppLayout />, // <-- Usar o componente importado
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product/:id", element: <ProductDetailPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
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