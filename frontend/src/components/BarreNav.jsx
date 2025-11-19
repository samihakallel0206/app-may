/*import React from 'react';
import './BarreNav.css';

const BarreNav =()=>{
  return (
      <div >BarreNav

      </div>
  );
};

export default BarreNav;*/
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BarreNav.css';

const BarreNav = ({ isAuthenticated, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logique de déconnexion
    navigate('/');
  };

  return (
    <header className="verifooredoo-header">
      <div className="header-container">
        <div className="logo-container">
          <div className="logo-circle">
            <span className="logo-text">V</span>
          </div>
          <div className="logo-text-container">
            <Link to="/" className="logo-main">VERIFOOREDOO</Link>
            <p className="logo-subtitle">Votre Plateforme Digitale Ooredoo</p>
          </div>
        </div>

        <nav className="main-nav">
          <Link to="/" className="nav-link">Accueil</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="nav-link">Profil</Link>
              <button className="btn-login" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Connexion</Link>
              <Link to="/register" className="nav-link">Inscription</Link>
            </>
          )}
        </nav>

        {!isAuthenticated && (
          <div className="header-actions">
            <Link to="/login">
              <button className="btn-login">Connexion</button>
            </Link>
            <Link to="/register">
              <button className="btn-register">Créer un Compte</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default BarreNav;
