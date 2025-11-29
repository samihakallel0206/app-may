const express = require("express");
const {
  getForfaits,
  purchaseForfait,
  updateConsommation,
} = require("../controllers/forfaitController");
const router = express.Router();

// @route   GET /api/forfaits
// @desc    Récupérer tous les forfaits disponibles
// @access  Public
router.get("/", getForfaits);

// @route   POST /api/forfaits/achat
// @desc    Acheter un forfait
// @access  Privé
router.post("/achat", purchaseForfait);

// @route   PATCH /api/forfaits/consommation
// @desc    Mettre à jour la consommation
// @access  Privé
router.patch("/consommation", updateConsommation);

module.exports = router;
