const express = require("express");
const {
  getProfile,
  updateProfile,
  updateForfait,
  getConsommation,
} = require("../controllers/userController");
const router = express.Router();

// @route   GET /api/users/profile
// @desc    Récupérer le profil utilisateur
// @access  Privé
router.get("/profile", getProfile);

// @route   PATCH /api/users/profile
// @desc    Mettre à jour le profil utilisateur
// @access  Privé
router.patch("/profile", updateProfile);

// @route   PATCH /api/users/forfait
// @desc    Mettre à jour le forfait utilisateur
// @access  Privé
router.patch("/forfait", updateForfait);

// @route   GET /api/users/consommation
// @desc    Récupérer la consommation actuelle
// @access  Privé
router.get("/consommation", getConsommation);

module.exports = router;
