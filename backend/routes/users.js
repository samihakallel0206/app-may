const express = require('express');
const User = require('../models/User');
const router = express.Router();

// @route   GET /api/users/profile
// @desc    Récupérer le profil utilisateur
// @access  Privé
router.get('/profile', async (req, res) => {
  try {
    // Récupérer l'ID utilisateur depuis le token (à implémenter avec le middleware d'auth)
    const userId = req.userId; // Ce sera défini par le middleware d'authentification
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('Erreur récupération profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// @route   PATCH /api/users/profile
// @desc    Mettre à jour le profil utilisateur
// @access  Privé
router.patch('/profile', async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, email } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: { user }
    });

  } catch (error) {
    console.error('Erreur mise à jour profil:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil'
    });
  }
});

// @route   PATCH /api/users/forfait
// @desc    Mettre à jour le forfait utilisateur
// @access  Privé
router.patch('/forfait', async (req, res) => {
  try {
    const userId = req.userId;
    const { data, minutes, sms } = req.body;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Mettre à jour le forfait
    if (data !== undefined) user.forfait.data = data;
    if (minutes !== undefined) user.forfait.minutes = minutes;
    if (sms !== undefined) user.forfait.sms = sms;

    await user.save();

    res.json({
      success: true,
      message: 'Forfait mis à jour avec succès',
      data: { user }
    });

  } catch (error) {
    console.error('Erreur mise à jour forfait:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du forfait'
    });
  }
});

// @route   GET /api/users/consommation
// @desc    Récupérer la consommation actuelle
// @access  Privé
router.get('/consommation', async (req, res) => {
  try {
    const userId = req.userId;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Simuler une consommation (dans un vrai projet, ça viendrait d'une base de données)
    const consommation = {
      data: {
        used: Math.floor(Math.random() * user.forfait.data * 0.8), // 80% max utilisé
        total: user.forfait.data
      },
      minutes: {
        used: Math.floor(Math.random() * user.forfait.minutes * 0.7),
        total: user.forfait.minutes
      },
      sms: {
        used: Math.floor(Math.random() * user.forfait.sms * 0.6),
        total: user.forfait.sms
      },
      solde: user.solde
    };

    res.json({
      success: true,
      data: { consommation }
    });

  } catch (error) {
    console.error('Erreur récupération consommation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

module.exports = router;