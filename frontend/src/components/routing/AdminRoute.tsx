import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminRoute = () => {
  const { userInfo, loading } = useAuth();

  // 1. Se ainda estivermos a verificar o localStorage, não faça nada ainda.
  // Em breve: Spinner.
  if (loading) {
    return <h1>A verificar autenticação...</h1>;
  }
  // 1. Verifica se existe informação do utilizador E se ele é um admin.
  if (userInfo && userInfo.isAdmin) {
    // 2. Se for um admin, renderiza o componente filho da rota (a página protegida).
    // O <Outlet /> faz exatamente isso quando usado em rotas aninhadas.
    return <Outlet />;
  } else if (userInfo) return <Navigate to="/" replace />;
  else {
    // 3. Se não for um admin, redireciona para a página de login.
    // O 'replace' evita que a rota protegida fique no histórico do navegador.
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
