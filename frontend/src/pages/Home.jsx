import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  const features = [
    {
      icon: 'fas fa-mobile-alt',
      title: 'Gestion Forfaits',
      description: 'Consultez votre consommation en temps réel'
    },
    {
      icon: 'fas fa-shopping-cart',
      title: 'Boutique',
      description: 'Produits technologiques Ooredoo'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Smart Dev',
      description: 'Résolvez des défis et gagnez des récompenses'
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Update CV',
      description: 'Créez votre CV et trouvez un emploi'
    }
  ];

  return (
    <div id="home" className="page active">
      <div className="container">
        {/* Hero Section */}
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold text-primary mb-4">
              Bienvenue sur <span className="text-danger">VerifOoredoo</span>
            </h1>
            <p className="lead mb-4">
              Votre plateforme digitale complète pour gérer vos forfaits, 
              acheter des produits technologiques, résoudre des défis et 
              développer votre carrière.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              {!isAuthenticated ? (
                <>
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate('/login')}
                  >
                    Se Connecter
                  </button>
                  <button 
                    className="btn btn-outline-primary btn-lg"
                    onClick={() => navigate('/register')}
                  >
                    Créer un Compte
                  </button>
                </>
              ) : (
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Accéder au Dashboard
                </button>
              )}
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="row text-center home-features">
              {features.map((feature, index) => (
                <div key={index} className="col-md-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <i className={`${feature.icon} fa-3x text-primary mb-3`}></i>
                      <h5 className="card-title">{feature.title}</h5>
                      <p className="card-text text-muted">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row mt-5 pt-5">
          <div className="col-12 text-center mb-5">
            <h2 className="fw-bold">Pourquoi choisir VerifOoredoo ?</h2>
          </div>
          
          <div className="col-md-3 col-6 text-center mb-4">
            <div className="stat-card">
              <h3 className="text-primary">10K+</h3>
              <p className="text-muted">Utilisateurs satisfaits</p>
            </div>
          </div>
          
          <div className="col-md-3 col-6 text-center mb-4">
            <div className="stat-card">
              <h3 className="text-primary">500+</h3>
              <p className="text-muted">Produits disponibles</p>
            </div>
          </div>
          
          <div className="col-md-3 col-6 text-center mb-4">
            <div className="stat-card">
              <h3 className="text-primary">50+</h3>
              <p className="text-muted">Défis résolus</p>
            </div>
          </div>
          
          <div className="col-md-3 col-6 text-center mb-4">
            <div className="stat-card">
              <h3 className="text-primary">24/7</h3>
              <p className="text-muted">Support client</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;