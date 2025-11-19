const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Inscription utilisateur
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Validation des champs requis
    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis'
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phone }] 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Un utilisateur avec cet email ou numéro existe déjà'
      });
    }

    // Créer nouvel utilisateur
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password
    });

    // Générer token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'verifooredoo_secret_key_2024',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Compte créé avec succès',
      token,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          forfait: user.forfait,
          solde: user.solde
        }
      }
    });

  } catch (error) {
    console.error('Erreur inscription:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création du compte'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Connexion utilisateur
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Validation
    if (!phone || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Numéro de téléphone et mot de passe requis' 
      });
    }

    // Trouver l'utilisateur avec le mot de passe
    const user = await User.findOne({ phone }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Numéro de téléphone ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Numéro de téléphone ou mot de passe incorrect'
      });
    }

    // Générer token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'verifooredoo_secret_key_2024',
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          forfait: user.forfait,
          solde: user.solde
        }
      }
    });

  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la connexion'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Récupérer l'utilisateur connecté
// @access  Privé
router.get('/me', async (req, res) => {
  try {
    // Note: Vous devrez ajouter le middleware d'authentification plus tard
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token non fourni'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'verifooredoo_secret_key_2024');
    const user = await User.findById(decoded.id);

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
    res.status(401).json({
      success: false,
      message: 'Token invalide'
    });
  }
});

module.exports = router;