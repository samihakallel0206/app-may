import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SmartDev = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const challengesData = [
    {
      id: 1,
      name: "Optimisation Réseau 5G",
      description: "Proposez des solutions innovantes pour améliorer la couverture réseau 5G en zone urbaine dense",
      category: "network",
      difficulty: "medium",
      reward: 500,
      participants: 35,
      progress: 65,
      deadline: "2024-12-15",
      status: "active",
      badge: "new",
      requirements: [
        "Solution technique détaillée",
        "Étude de faisabilité économique",
        "Plan d'implémentation"
      ],
      tags: ["5G", "Réseau", "Optimisation"]
    },
    {
      id: 2,
      name: "Application Mobile Innovante",
      description: "Développez une application mobile qui résout un problème quotidien des utilisateurs Ooredoo",
      category: "development",
      difficulty: "hard",
      reward: 1000,
      participants: 78,
      progress: 40,
      deadline: "2025-01-20",
      status: "active",
      badge: "popular",
      requirements: [
        "Prototype fonctionnel",
        "Documentation technique",
        "Plan de déploiement"
      ],
      tags: ["Mobile", "Innovation", "Développement"]
    },
    {
      id: 3,
      name: "Sécurité des Données",
      description: "Identifiez et proposez des solutions pour renforcer la sécurité des données clients",
      category: "security",
      difficulty: "hard",
      reward: 750,
      participants: 22,
      progress: 25,
      deadline: "2025-02-10",
      status: "active",
      badge: "advanced",
      requirements: [
        "Analyse des risques",
        "Solutions de sécurisation",
        "Plan de mise en œuvre"
      ],
      tags: ["Sécurité", "Données", "Protection"]
    }
  ];

  const leaderboardData = [
    {
      rank: 1,
      userId: 101,
      name: "Ahmed Ben Salah",
      score: 2450,
      challengesCompleted: 15,
      avatar: "AB"
    },
    {
      rank: 2,
      userId: 102,
      name: "Marie Dupont",
      score: 1980,
      challengesCompleted: 12,
      avatar: "MD"
    },
    {
      rank: 3,
      userId: 103,
      name: "Karim Jlassi",
      score: 1650,
      challengesCompleted: 10,
      avatar: "KJ"
    }
  ];

  useEffect(() => {
    // Simuler le chargement des données
    const loadData = async () => {
      setTimeout(() => {
        setChallenges(challengesData);
        setLeaderboard(leaderboardData);
      }, 1000);
    };

    loadData();
  }, []);

  const openChallengeModal = (challenge) => {
    setSelectedChallenge(challenge);
    setShowModal(true);
  };

  const closeChallengeModal = () => {
    setShowModal(false);
    setSelectedChallenge(null);
  };

  const handleParticipate = () => {
    if (!isAuthenticated) {
      alert('Veuillez vous connecter pour participer aux défis');
      navigate('/login');
      return;
    }

    if (selectedChallenge) {
      alert(`Vous participez maintenant au défi: ${selectedChallenge.name}`);
      // Ici vous appelleriez l'API pour enregistrer la participation
      closeChallengeModal();
    }
  };

  const getBadgeClass = (badge) => {
    switch (badge) {
      case 'new': return 'challenge-badge new';
      case 'popular': return 'challenge-badge popular';
      case 'advanced': return 'challenge-badge advanced';
      default: return 'challenge-badge';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      case 'expert': return 'dark';
      default: return 'secondary';
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Smart Dev - Défis et Récompenses</h1>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Retour au Dashboard
          </button>
        </div>

        {/* Introduction */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="forfait-card text-center bg-light">
              <h3 className="text-primary">
                <i className="fas fa-trophy me-2"></i>
                Développez vos compétences et gagnez des récompenses
              </h3>
              <p className="text-muted mb-0">
                Participez à nos défis technologiques et montrez votre talent. 
                Les meilleures solutions sont récompensées !
              </p>
            </div>
          </div>
        </div>

        {/* Liste des défis */}
        <div className="challenges-grid">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="challenge-card">
              <span className={getBadgeClass(challenge.badge)}>
                {challenge.badge === 'new' && 'Nouveau'}
                {challenge.badge === 'popular' && 'Populaire'}
                {challenge.badge === 'advanced' && 'Avancé'}
              </span>
              
              <h3>{challenge.name}</h3>
              <p className="text-muted">{challenge.description}</p>
              
              <div className="mb-3">
                <span className={`badge bg-${getDifficultyColor(challenge.difficulty)} me-2`}>
                  {challenge.difficulty}
                </span>
                {challenge.tags.map(tag => (
                  <span key={tag} className="badge bg-light text-dark me-1">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="challenge-progress">
                <div 
                  className="challenge-progress-bar" 
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
              
              <div className="challenge-stats">
                <span>{challenge.progress}% complété</span>
                <span>{challenge.participants} participants</span>
              </div>
              
              <div className="reward-badge mb-3">
                Récompense: {challenge.reward} DT
              </div>
              
              <button 
                className="btn btn-warning w-100"
                onClick={() => openChallengeModal(challenge)}
              >
                <i className="fas fa-eye me-2"></i>
                Voir les Détails
              </button>
            </div>
          ))}
        </div>

        {/* Classement */}
        <div className="leaderboard mt-5">
          <h3 className="mb-4">
            <i className="fas fa-trophy text-warning me-2"></i>
            Classement des Développeurs
          </h3>
          
          {leaderboard.map((player) => (
            <div key={player.rank} className="leaderboard-item">
              <div className="leaderboard-rank">
                {player.rank}
              </div>
              <div className="leaderboard-user">
                <strong>{player.name}</strong>
                <div className="text-muted">{player.challengesCompleted} défis complétés</div>
              </div>
              <div className="leaderboard-score">
                {player.score} pts
              </div>
            </div>
          ))}
        </div>

        {/* Modal des détails du défi */}
        {showModal && selectedChallenge && (
          <div className="challenge-modal active">
            <div className="challenge-modal-content">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>{selectedChallenge.name}</h3>
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={closeChallengeModal}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="mb-4">
                <p className="text-muted">{selectedChallenge.description}</p>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Difficulté:</strong>
                    <span className={`badge bg-${getDifficultyColor(selectedChallenge.difficulty)} ms-2`}>
                      {selectedChallenge.difficulty}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <strong>Date limite:</strong>
                    <span className="ms-2">{selectedChallenge.deadline}</span>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Récompense:</strong>
                    <span className="text-success ms-2">{selectedChallenge.reward} DT</span>
                  </div>
                  <div className="col-md-6">
                    <strong>Participants:</strong>
                    <span className="ms-2">{selectedChallenge.participants}</span>
                  </div>
                </div>
              </div>

              <h5>Exigences du défi:</h5>
              <ul className="mb-4">
                {selectedChallenge.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>

              <h5>Tags:</h5>
              <div className="mb-4">
                {selectedChallenge.tags.map(tag => (
                  <span key={tag} className="badge bg-light text-dark me-1">
                    #{tag}
                  </span>
                ))}
              </div>

              <button 
                className="btn btn-success w-100"
                onClick={handleParticipate}
              >
                <i className="fas fa-flag me-2"></i>
                Participer au Défi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartDev;