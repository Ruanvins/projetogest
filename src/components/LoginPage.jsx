import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

import GoogleIcon from "../assets/icons/google.png";
import FacebookIcon from "../assets/icons/facebook.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await api.post('/auth/login', {
        email,
        senha
      });

      localStorage.setItem("token", resposta.data.token);

      navigate('/inicio');
    } catch (err) {
      setErro("Credenciais inválidas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 style={{ fontFamily: "Montserrat", fontWeight: 400 }}>
          GEST<span style={{ fontWeight: 800 }}>FINANCE</span>
        </h1>

        <h2 style={{ fontFamily: "Poppins", fontWeight: 700 }}>
          Bem-vindo de volta!
        </h2>

        <p style={{ fontFamily: "Poppins", fontWeight: 400 }}>
          Seu futuro financeiro começa aqui.
        </p>
        <p style={{ fontFamily: "Poppins", fontWeight: 400 }}>
          Controle suas finanças com simplicidade e segurança.
        </p>
      </div>

      <div className="login-right">
        <h1 className='title-login' style={{ fontFamily: "Poppins", fontWeight: 700 }}>Entrar</h1>
        <p className='p-login'>
          Não tem uma conta?{" "}
          <span onClick={() => navigate('/cadastro')}>Crie sua conta</span>
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Palavra passe</label>

            <div className="password-container">
              <input
                type={showPass ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />

              <span
                className="toggle-icon"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>

            <a href="#" className="forgot-link">Esqueceu a palavra passe?</a>
          </div>

          {erro && <p style={{ color: "red", fontSize: "14px" }}>{erro}</p>}

          <button type="submit">Entrar</button>
        </form>

        <div className="social-login">
          <p>Entrar com:</p>

          <div className="social-icons">
            <img src={GoogleIcon} alt="Google Login" />
            <img src={FacebookIcon} alt="Facebook Login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
