import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Suas páginas existentes
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage';

// Novas páginas adicionadas
import InicioPage from './components/InicioPage';
import ContasPagar from './components/ContasPagar';
import ContasReceber from './components/ContasReceber';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rota pública: Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Rota pública: Cadastro */}
        <Route path="/cadastro" element={<CreateAccountPage />} />

        {/* Início do sistema */}
        <Route path="/inicio" element={<InicioPage />} />

        {/* Contas a pagar */}
        <Route path="/contas-pagar" element={<ContasPagar />} />

        {/* Contas a receber */}
        <Route path="/contas-receber" element={<ContasReceber />} />
      </Routes>
    </Router>
  );
};

export default App;
