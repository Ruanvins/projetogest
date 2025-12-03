import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente de rota protegida.
 * Verifica se há um token JWT salvo no localStorage.
 * Se houver, permite acesso à rota protegida.
 * Caso contrário, redireciona para a tela de login (/).
 */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;