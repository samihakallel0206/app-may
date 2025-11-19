import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  
  const [stats, setStats] = useState({
    dataRemaining: '-- Go',
    minutesRemaining: '-- min',
    smsRemaining: '--',
    solde: '-- DT'
  });

  const modules = [
    {
      icon: 'fas fa-chart-pie',
      title: 'Mes Forfaits',
      description: 'Consultez et gérez votre consommation',
      path: '/forfaits'
    },
    {
      icon: 'fas fa-shopping-bag',
      title: 'Boutique',
      description: 'Découvrez nos produits technologiques',
      path: '/boutique'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Smart Dev',
      description: 'Résolvez des défis et gagnez des récompenses',
      path: '/smartdev'
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Update CV',
      description: 'Créez votre CV et trouvez un emploi',
      path: '/updatecv'
    }
  ];

  useEffect(() => {
    // Simuler le chargement des données
    const loadDashboardData = async () => {
      // Simulation d'appel API
      setTimeout(() => {
        setStats({
          dataRemaining: '7.5 Go',
          minutesRemaining: '65 min',
          smsRemaining: '42',
          solde: '25.5 DT'
        });
      }, 1000);
    };

    loadDashboardData();
  }, []);

  const renderChart = (data, labels, color = '#E2001A') => {
    const maxValue = Math.max(...data);
    
    return (
      <div className="chart-bar">
        {data.map((value, index) => {
          const height = (value / maxValue) * 100;
          return (
            <div key={index} className="chart-bar-item" style={{ height: `${height}%` }}>
              <div className="chart-bar-label">{labels[index]}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="page">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-4">Tableau de Bord</h1>
            <p className="lead">Bienvenue, <span className="text-primary">{user?.firstName} {user?.lastName}</span> !</p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3 className="text-primary">{stats.dataRemaining}</h3>
            <p>Data Restante</p>
            <div className="progress mt-2">
              <div className="progress-bar bg-success" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div className="stat-card">
            <h3 className="text-primary">{stats.minutesRemaining}</h3>
            <p>Minutes Restantes</p>
            <div className="progress mt-2">
              <div className="progress-bar bg-info" style={{ width: '35%' }}></div>
            </div>
          </div>
          
          <div className="stat-card">
            <h3 className="text-primary">{stats.smsRemaining}</h3>
            <p>SMS Restants</p>
            <div className="progress mt-2">
              <div className="progress-bar bg-warning" style={{ width: '58%' }}></div>
            </div>
          </div>
          
          <div className="stat-card">
            <h3 className="text-primary">{stats.solde}</h3>
            <p>Solde Principal</p>
            <small className="text-muted">Recharger</small>
          </div>
        </div>

        {/* Graphiques */}
        <div className="dashboard-charts">
          <div className="chart-container">
            <h4>Consommation Data (Mois en cours)</h4>
            <div className="chart">
              {renderChart(
                [3, 5, 7, 6, 8, 10, 9, 8, 7, 6, 5, 4],
                ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
              )}
            </div>
          </div>
          
          <div className="chart-container">
            <h4>Activité Mensuelle</h4>
            <div className="chart">
              {renderChart(
                [20, 35, 45, 30, 50, 60, 55, 40, 35, 25, 30, 40],
                ['Appels', 'SMS', 'Data', 'Forfaits', 'Recharges', 'Services']
              )}
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="dashboard-modules">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className="module-card"
              onClick={() => navigate(module.path)}
            >
              <div className="module-icon">
                <i className={module.icon}></i>
              </div>
              <h3>{module.title}</h3>
              <p className="text-muted">{module.description}</p>
              <button className="btn btn-outline-primary mt-2">
                Accéder <i className="fas fa-arrow-right ms-1"></i>
              </button>
            </div>
          ))}
        </div>

        {/* Notifications rapides */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              <strong>Nouveauté :</strong> Découvrez nos nouveaux forfaits 5G avec des données illimitées !
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;