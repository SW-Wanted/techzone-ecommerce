import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminRoute = () => {
  const { userInfo } = useAuth();

  // 1. Verifica se existe informação do utilizador E se ele é um admin.
  if (userInfo && userInfo.isAdmin) {
    // 2. Se for um admin, renderiza o componente filho da rota (a página protegida).
    // O <Outlet /> faz exatamente isso quando usado em rotas aninhadas.
    return <Outlet />;
  } else {
    // 3. Se não for um admin, redireciona para a página de login.
    // O 'replace' evita que a rota protegida fique no histórico do navegador.
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;