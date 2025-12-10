import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Suas páginas existentes
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';

// Novas páginas adicionadas
import InicioPage from './components/InicioPage';
import ContasPagar from './components/ContasPagar';
import ContasReceber from './components/ContasReceber';

// Componente para proteger rotas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota pública: Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Rota pública: Cadastro */}
        <Route path="/cadastro" element={<CreateAccountPage />} />

        {/* Início do sistema (protegida) */}
        <Route
          path="/inicio"
          element={
            <PrivateRoute>
              <InicioPage />
            </PrivateRoute>
          }
        />

        {/* Contas a pagar (protegida) */}
        <Route
          path="/contas-pagar"
          element={
            <PrivateRoute>
              <ContasPagar />
            </PrivateRoute>
          }
        />

        {/* Contas a receber (protegida) */}
        <Route
          path="/contas-receber"
          element={
            <PrivateRoute>
              <ContasReceber />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
