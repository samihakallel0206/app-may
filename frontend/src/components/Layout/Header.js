import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { toggleCart, selectCartItemCount } from '../../redux/slices/cartSlice';
// import './Header.css';

const Header = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const cartItemCount = useSelector(selectCartItemCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effet pour le scroll du header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu utilisateur en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserMenu(false);
    };

    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleNavigation = (path) => {
    navigate(path);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate('/');
  };

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`verifooredoo-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="logo-container" onClick={() => handleNavigation('/')}>
          <div className="logo-circle">
            <span className="logo-text">V</span>
          </div>
          <div className="logo-text-container">
            <h1 className="logo-main">VERIFOOREDOO</h1>
            <p className="logo-subtitle">Votre Plateforme Digitale Ooredoo</p>
          </div>
        </div>

        {/* Navigation principale */}
        <nav className="main-nav">
          <button 
            className={`nav-link ${isActivePage('/') ? 'active' : ''}`}
            onClick={() => handleNavigation('/')}
          >
            Accueil
          </button>
          
          {!isAuthenticated ? (
            <>
              <button 
                className={`nav-link ${isActivePage('/login') ? 'active' : ''}`}
                onClick={() => handleNavigation('/login')}
              >
                Connexion
              </button>
              <button 
                className={`nav-link ${isActivePage('/register') ? 'active' : ''}`}
                onClick={() => handleNavigation('/register')}
              >
                Inscription
              </button>
            </>
          ) : (
            <>
              <button 
                className={`nav-link ${isActivePage('/dashboard') ? 'active' : ''}`}
                onClick={() => handleNavigation('/dashboard')}
              >
                Dashboard
              </button>
              <button 
                className={`nav-link ${isActivePage('/forfaits') ? 'active' : ''}`}
                onClick={() => handleNavigation('/forfaits')}
              >
                Forfaits
              </button>
              <button 
                className={`nav-link ${isActivePage('/boutique') ? 'active' : ''}`}
                onClick={() => handleNavigation('/boutique')}
              >
                Boutique
              </button>
            </>
          )}
        </nav>

        {/* Menu utilisateur et panier */}
        <div className="user-menu">
          {/* Icône panier */}
          <div className="cart-indicator" onClick={() => dispatch(toggleCart())}>
            <i className="fas fa-shopping-cart fa-lg"></i>
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </div>
          
          {!isAuthenticated ? (
            // Boutons connexion/inscription
            <div className="header-actions">
              <button 
                className="btn-login" 
                onClick={() => handleNavigation('/login')}
              >
                Connexion
              </button>
              <button 
                className="btn-register" 
                onClick={() => handleNavigation('/register')}
              >
                Créer un Compte
              </button>
            </div>
          ) : (
            // Menu utilisateur connecté
            <div className="user-info">
              <div 
                className="user-avatar" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserMenu(!showUserMenu);
                }}
              >
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                
                {/* Menu déroulant utilisateur */}
                {showUserMenu && (
                  <div className="user-dropdown show">
                    <button 
                      className="user-dropdown-item"
                      onClick={() => handleNavigation('/dashboard')}
                    >
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Tableau de bord
                    </button>
                    <button 
                      className="user-dropdown-item"
                      onClick={() => handleNavigation('/forfaits')}
                    >
                      <i className="fas fa-chart-pie me-2"></i>
                      Mes Forfaits
                    </button>
                    <button 
                      className="user-dropdown-item"
                      onClick={() => handleNavigation('/boutique')}
                    >
                      <i className="fas fa-shopping-bag me-2"></i>
                      Boutique
                    </button>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="user-dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;