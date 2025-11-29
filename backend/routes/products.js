const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  getProductsByCategory,
} = require("../controllers/productController");

// @route   GET /api/products
// @desc    Récupérer tous les produits
// @access  Public
router.get("/", getProducts);

// @route   GET /api/products/:id
// @desc    Récupérer un produit spécifique
// @access  Public
router.get("/:id", getProductById);

// @route   GET /api/products/category/:category
// @desc    Récupérer les produits par catégorie
// @access  Public
router.get("/category/:category", getProductsByCategory);

module.exports = router;
