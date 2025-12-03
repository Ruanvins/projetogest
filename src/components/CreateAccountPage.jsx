import React, { useState } from "react";
import "../styles/CreateAccountPage.css";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateAccountPage = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/cadastro", {
        nome,
        email,
        senha,
        telefone,
      });

      navigate("/");
    } catch (err) {
      setErro("Erro ao cadastrar. Tente outro e-mail.");
    }
  };

  return (
    <div className="create-container">
      <div className="create-left">
        <h1 className="title-create" style={{ fontFamily: "Montserrat", fontWeight: 400 }}>
          GEST<span style={{ fontWeight: 800 }}>FINANCE</span>
        </h1>

        <h2 className="welcome-title">Bem-vindo!</h2>

        <p className="welcome-text">
          Crie sua conta agora mesmo e deixe de lado a preocupação com controle financeiro!
        </p>
      </div>

      <div className="create-right">
        <h2 className="title">Crie sua conta</h2>
        <small className="subtitle">Preencha seus dados</small>

        <form onSubmit={handleCadastro}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div className="password-container">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Digite sua senha"
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
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="(81) 99999-9999"
              maxLength={15}
              value={telefone}
              onChange={(e) =>
                setTelefone(
                  e.target.value
                    .replace(/\D/g, "")
                    .replace(/^(\d{2})(\d)/, "($1) $2")
                    .replace(/(\d{5})(\d)/, "$1-$2")
                )
              }
              required
            />
          </div>

          {erro && <p style={{ color: "red", fontSize: "14px" }}>{erro}</p>}

          <button type="submit">Cadastre-se</button>
        </form>

        <p className="back-login">
          Já tem uma conta? <span onClick={() => navigate("/")}>Entrar</span>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountPage;
