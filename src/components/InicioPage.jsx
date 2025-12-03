import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/InicioPage.css";

const InicioPage = () => {
  const userEmail = "usuario@email.com"; // Substitua pelo email real do usuário
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log("Logout realizado");
  };

  return (
    <div className="inicio-container">
      {/* Menu principal */}
      <nav className="inicio-nav">
        <div className="nav-left">
          <h1 className="logo">GestFinance</h1>
          <ul className="nav-links">
            <li>
              <Link to="/contas-pagar">Contas a Pagar</Link>
            </li>
            <li>
              <Link to="/contas-receber">Contas a Receber</Link>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <div className="user-menu">
            <button className="user-menu-btn" onClick={toggleUserMenu}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <span className="user-email">{userEmail}</span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                  </svg>
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="inicio-main">
        <header className="inicio-header">
          <p>Gerencie suas contas a pagar e a receber de forma prática.</p>
        </header>

        <div className="card-grid">
          <Link to="/contas-pagar" className="card card-pagar">
            <h2>Contas a Pagar</h2>
            <p>Registre e acompanhe suas despesas.</p>
          </Link>

          <Link to="/contas-receber" className="card card-receber">
            <h2>Contas a Receber</h2>
            <p>Controle suas receitas e recebimentos.</p>
          </Link>
        </div>
      </main>

      <footer className="inicio-footer">
        <small>© {new Date().getFullYear()} GestFinance</small>
      </footer>
    </div>
  );
};

export default InicioPage;