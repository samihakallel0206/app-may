const express = require('express');
const User = require('../models/User');
const router = express.Router();

// @route   GET /api/forfaits
// @desc    Récupérer tous les forfaits disponibles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const forfaits = [
      {
        id: 1,
        name: "Forfait Start",
        price: 15,
        data: 5, // Go
        minutes: 60,
        sms: 30,
        description: "Parfait pour les petits utilisateurs",
        popular: false
      },
      {
        id: 2,
        name: "Forfait Pro",
        price: 25,
        data: 10,
        minutes: 100,
        sms: 50,
        description: "Idéal pour un usage professionnel",
        popular: true
      },
      {
        id: 3,
        name: "Forfait Premium",
        price: 40,
        data: 20,
        minutes: 200,
        sms: 100,
        description: "Pour les gros consommateurs",
        popular: false
      },
      {
        id: 4,
        name: "Forfait Illimité",
        price: 60,
        data: 50,
        minutes: 300,
        sms: 200,
        description: "Pour les vrais passionnés",
        popular: false
      }
    ];

    res.json({
      success: true,
      data: { forfaits }
    });

  } catch (error) {
    console.error('Erreur récupération forfaits:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// @route   POST /api/forfaits/achat
// @desc    Acheter un forfait
// @access  Privé
router.post('/achat', async (req, res) => {
  try {
    const userId = req.userId;
    const { forfaitId } = req.body;

    const forfaits = {
      1: { data: 5, minutes: 60, sms: 30, price: 15 },
      2: { data: 10, minutes: 100, sms: 50, price: 25 },
      3: { data: 20, minutes: 200, sms: 100, price: 40 },
      4: { data: 50, minutes: 300, sms: 200, price: 60 }
    };

    const forfait = forfaits[forfaitId];
    
    if (!forfait) {
      return res.status(400).json({
        success: false,
        message: 'Forfait non trouvé'
      });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Vérifier le solde
    if (user.solde < forfait.price) {
      return res.status(400).json({
        success: false,
        message: 'Solde insuffisant'
      });
    }

    // Débiter le solde et mettre à jour le forfait
    user.solde -= forfait.price;
    user.forfait.data += forfait.data;
    user.forfait.minutes += forfait.minutes;
    user.forfait.sms += forfait.sms;

    await user.save();

    res.json({
      success: true,
      message: 'Forfait acheté avec succès',
      data: { 
        user,
        forfait: forfait.name
      }
    });

  } catch (error) {
    console.error('Erreur achat forfait:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'achat du forfait'
    });
  }
});

// @route   PATCH /api/forfaits/consommation
// @desc    Mettre à jour la consommation
// @access  Privé
router.patch('/consommation', async (req, res) => {
  try {
    const userId = req.userId;
    const { dataUsed, minutesUsed, smsUsed } = req.body;

    // Dans un vrai projet, vous stockeriez cette information dans une collection séparée
    // Pour l'exemple, on simule juste la mise à jour

    res.json({
      success: true,
      message: 'Consommation mise à jour',
      data: {
        consommation: {
          dataUsed: dataUsed || 0,
          minutesUsed: minutesUsed || 0,
          smsUsed: smsUsed || 0
        }
      }
    });

  } catch (error) {
    console.error('Erreur mise à jour consommation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

module.exports = router;