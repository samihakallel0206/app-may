const express = require("express");
const router = express.Router();

const {
  getChallenges,
  getChallengeById,
  participateInChallenge,
  getLeaderboard,
} = require("../controllers/challengeController");

// @route   GET /api/challenges
// @desc    Récupérer tous les challenges
// @access  Public
router.get("/", getChallenges);

// @route   GET /api/challenges/:id
// @desc    Récupérer un challenge spécifique
// @access  Public
router.get("/:id", getChallengeById);

// @route   POST /api/challenges/:id/participate
// @desc    Participer à un challenge
// @access  Privé
router.post("/:id/participate", participateInChallenge);

// @route   GET /api/challenges/leaderboard
// @desc    Récupérer le classement des développeurs
// @access  Public
router.get("/leaderboard", getLeaderboard);

module.exports = router;
