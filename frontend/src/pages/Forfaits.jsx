import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Forfaits = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  const [consommation, setConsommation] = useState({
    data: { used: 0, total: 10 },
    minutes: { used: 0, total: 100 },
    sms: { used: 0, total: 50 }
  });

  const forfaitsDisponibles = [
    {
      id: 1,
      name: "Forfait Start",
      price: 15,
      data: 5,
      minutes: 60,
      sms: 30,
      popular: false
    },
    {
      id: 2,
      name: "Forfait Pro",
      price: 25,
      data: 10,
      minutes: 100,
      sms: 50,
      popular: true
    },
    {
      id: 3,
      name: "Forfait Premium",
      price: 40,
      data: 20,
      minutes: 200,
      sms: 100,
      popular: false
    }
  ];

  useEffect(() => {
    // Simuler le chargement des données de consommation
    const loadConsommation = async () => {
      setTimeout(() => {
        setConsommation({
          data: { used: 2.5, total: 10 },
          minutes: { used: 35, total: 100 },
          sms: { used: 8, total: 50 }
        });
      }, 1000);
    };

    loadConsommation();
  }, []);

  const calculatePercentage = (used, total) => {
    return total > 0 ? (used / total) * 100 : 0;
  };

  const handleAchatForfait = (forfait) => {
    if (user.solde < forfait.price) {
      alert('Solde insuffisant. Veuillez recharger votre compte.');
      return;
    }
    
    if (window.confirm(`Confirmer l'achat du ${forfait.name} pour ${forfait.price} DT ?`)) {
      alert(`Forfait ${forfait.name} acheté avec succès !`);
      // Ici vous appelleriez l'API pour acheter le forfait
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Mes Forfaits et Consommation</h1>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Retour au Dashboard
          </button>
        </div>

        {/* Consommation actuelle */}
        <div className="row mb-5">
          <div className="col-md-4 mb-4">
            <div className="forfait-card">
              <h3 className="text-primary">
                <i className="fas fa-database me-2"></i>
                Forfait Internet
              </h3>
              <p className="mb-2">
                Data utilisée: <strong>{consommation.data.used} Go</strong> / {consommation.data.total} Go
              </p>
              <div className="progress">
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${calculatePercentage(consommation.data.used, consommation.data.total)}%` }}
                ></div>
              </div>
              <small className="text-muted">
                {((consommation.data.total - consommation.data.used)).toFixed(1)} Go restants
              </small>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="forfait-card">
              <h3 className="text-primary">
                <i className="fas fa-phone me-2"></i>
                Forfait Appels
              </h3>
              <p className="mb-2">
                Minutes utilisées: <strong>{consommation.minutes.used}</strong> / {consommation.minutes.total} min
              </p>
              <div className="progress">
                <div 
                  className="progress-bar bg-info" 
                  style={{ width: `${calculatePercentage(consommation.minutes.used, consommation.minutes.total)}%` }}
                ></div>
              </div>
              <small className="text-muted">
                {consommation.minutes.total - consommation.minutes.used} minutes restantes
              </small>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="forfait-card">
              <h3 className="text-primary">
                <i className="fas fa-sms me-2"></i>
                Forfait SMS
              </h3>
              <p className="mb-2">
                SMS envoyés: <strong>{consommation.sms.used}</strong> / {consommation.sms.total}
              </p>
              <div className="progress">
                <div 
                  className="progress-bar bg-warning" 
                  style={{ width: `${calculatePercentage(consommation.sms.used, consommation.sms.total)}%` }}
                ></div>
              </div>
              <small className="text-muted">
                {consommation.sms.total - consommation.sms.used} SMS restants
              </small>
            </div>
          </div>
        </div>

        {/* Forfaits disponibles */}
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4">Forfaits Disponibles</h2>
            <div className="row">
              {forfaitsDisponibles.map((forfait) => (
                <div key={forfait.id} className="col-lg-4 col-md-6 mb-4">
                  <div className={`forfait-card ${forfait.popular ? 'border-primary' : ''}`}>
                    {forfait.popular && (
                      <span className="badge bg-primary mb-2">Le plus populaire</span>
                    )}
                    <h4 className="text-primary">{forfait.name}</h4>
                    <h3 className="text-success">{forfait.price} DT</h3>
                    
                    <div className="mb-3">
                      <p className="mb-1">
                        <i className="fas fa-database me-2 text-info"></i>
                        {forfait.data} Go Internet
                      </p>
                      <p className="mb-1">
                        <i className="fas fa-phone me-2 text-info"></i>
                        {forfait.minutes} min d'appel
                      </p>
                      <p className="mb-1">
                        <i className="fas fa-sms me-2 text-info"></i>
                        {forfait.sms} SMS
                      </p>
                    </div>
                    
                    <button 
                      className={`btn ${forfait.popular ? 'btn-primary' : 'btn-outline-primary'} w-100`}
                      onClick={() => handleAchatForfait(forfait)}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      Acheter Maintenant
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rechargement de solde */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="forfait-card text-center">
              <h3 className="text-primary">Recharger Votre Solde</h3>
              <p className="text-muted mb-4">Rechargez rapidement votre solde pour acheter des forfaits</p>
              
              <div className="row justify-content-center">
                {[5, 10, 20, 50].map((montant) => (
                  <div key={montant} className="col-md-3 col-6 mb-3">
                    <button className="btn btn-outline-success w-100 py-3">
                      {montant} DT
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forfaits;