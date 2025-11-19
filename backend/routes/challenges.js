const express = require('express');
const router = express.Router();

// Données des challenges
const challenges = [
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
  },
  {
    id: 4,
    name: "IA pour Service Client",
    description: "Développez une solution IA pour améliorer le service client Ooredoo",
    category: "ai",
    difficulty: "expert",
    reward: 1500,
    participants: 15,
    progress: 20,
    deadline: "2025-03-01",
    status: "active",
    badge: "new",
    requirements: [
      "Algorithme d'IA fonctionnel",
      "Interface utilisateur",
      "Tests de performance"
    ],
    tags: ["IA", "Service Client", "Automatisation"]
  }
];

// Classement des développeurs
const leaderboard = [
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
  },
  {
    rank: 4,
    userId: 104,
    name: "Sarah Chen",
    score: 1420,
    challengesCompleted: 8,
    avatar: "SC"
  },
  {
    rank: 5,
    userId: 105,
    name: "Mohamed Ali",
    score: 1280,
    challengesCompleted: 7,
    avatar: "MA"
  }
];

// @route   GET /api/challenges
// @desc    Récupérer tous les challenges
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, status } = req.query;
    
    let filteredChallenges = [...challenges];

    // Filtres
    if (category) {
      filteredChallenges = filteredChallenges.filter(
        challenge => challenge.category === category
      );
    }

    if (difficulty) {
      filteredChallenges = filteredChallenges.filter(
        challenge => challenge.difficulty === difficulty
      );
    }

    if (status) {
      filteredChallenges = filteredChallenges.filter(
        challenge => challenge.status === status
      );
    }

    res.json({
      success: true,
      data: { 
        challenges: filteredChallenges,
        total: filteredChallenges.length
      }
    });

  } catch (error) {
    console.error('Erreur récupération challenges:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// @route   GET /api/challenges/:id
// @desc    Récupérer un challenge spécifique
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);
    const challenge = challenges.find(c => c.id === challengeId);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge non trouvé'
      });
    }

    res.json({
      success: true,
      data: { challenge }
    });

  } catch (error) {
    console.error('Erreur récupération challenge:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// @route   POST /api/challenges/:id/participate
// @desc    Participer à un challenge
// @access  Privé
router.post('/:id/participate', async (req, res) => {
  try {
    const challengeId = parseInt(req.params.id);
    const userId = req.userId; // De middleware d'authentification
    
    const challenge = challenges.find(c => c.id === challengeId);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge non trouvé'
      });
    }

    if (challenge.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Ce challenge n\'est plus actif'
      });
    }

    // Simuler la participation
    // Dans un vrai projet, vous enregistreriez la participation en base de données

    res.json({
      success: true,
      message: 'Participation enregistrée avec succès',
      data: {
        challenge: challenge.name,
        participationDate: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Erreur participation challenge:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la participation'
    });
  }
});

// @route   GET /api/challenges/leaderboard
// @desc    Récupérer le classement des développeurs
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    res.json({
      success: true,
      data: { leaderboard }
    });

  } catch (error) {
    console.error('Erreur récupération classement:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

module.exports = router;