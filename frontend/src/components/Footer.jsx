/*import React from 'react'

const Footer =()=>{
    return(
        <div>Footer </div>

    )
}

export default Footer;*/
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="verifooredoo-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>VerifOoredoo</h4>
            <p>Votre plateforme digitale complète pour gérer vos services Ooredoo.</p>
          </div>
          <div className="footer-section">
            <h4>Liens Rapides</h4>
            <a href="/">Accueil</a>
            <a href="/login">Connexion</a>
            <a href="/register">Inscription</a>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Service Client: 1111</p>
            <p>Email: support@verifooredoo.tn</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 VerifOoredoo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;