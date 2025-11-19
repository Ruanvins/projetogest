import React from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>GESTFINANCE</h1>
        <h2>Bem-Vindo de volta!</h2>
        <p>Seu futuro financeiro começa aqui.</p>
        <p>Controle suas finanças com simplicidade e segurança.</p>
      </div>
      <div className="login-right">
        <h2>Entrar</h2>
        <p>Não tem uma conta? <span onClick={() => navigate('/criar-conta')}>Crie sua conta</span></p>
        <form>
          <input type="text" placeholder="Nome do usuário ou E-mail" required />
          <input type="password" placeholder="Palavra passe" required />
          <a href="#">Esqueceu a palavra passe?</a>
          <button type="submit">Entrar</button>
        </form>
        <div className="social-login">
          <p>Entrar com:</p>
          <button className="google-btn">Google</button>
          <button className="facebook-btn">Facebook</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;