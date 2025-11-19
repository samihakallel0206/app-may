const express = require('express');
const router = express.Router();

// Données des produits (dans un vrai projet, ça viendrait d'une base de données)
const products = [
  {
    id: 1,
    name: "Smartphone Ooredoo Pro",
    price: 299,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80",
    description: "Dernière génération - Écran 6.7\" - 128GB",
    features: ["Écran 6.7\" AMOLED", "128GB Stockage", "Double caméra 48MP", "Batterie 5000mAh"],
    inStock: true,
    rating: 4.5
  },
  {
    id: 2,
    name: "Smartwatch Connect",
    price: 199,
    category: "watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1099&q=80",
    description: "Montre connectée - Écran AMOLED - GPS intégré",
    features: ["Écran AMOLED 1.4\"", "GPS intégré", "Résistance à l'eau", "Autonomie 7 jours"],
    inStock: true,
    rating: 4.3
  },
  {
    id: 3,
    name: "Laptop Elite",
    price: 899,
    category: "laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80",
    description: "Ordinateur portable - i7 - 16GB RAM - 512GB SSD",
    features: ["Processeur i7", "16GB RAM", "512GB SSD", "Écran 15.6\" Full HD"],
    inStock: true,
    rating: 4.7
  },
  {
    id: 4,
    name: "Écouteurs Bluetooth Pro",
    price: 149,
    category: "headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    description: "Réduction de bruit active - Autonomie 30h",
    features: ["Réduction de bruit active", "Autonomie 30h", "Charge rapide", "Qualité audio HD"],
    inStock: true,
    rating: 4.4
  },
  {
    id: 5,
    name: "Tablette Ooredoo Max",
    price: 399,
    category: "tablet",
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&auto=format&fit=crop&w=1234&q=80",
    description: "Tablette 10.5\" - 64GB - 4G LTE",
    features: ["Écran 10.5\"", "64GB Stockage", "4G LTE", "Stylus inclus"],
    inStock: false,
    rating: 4.2
  },
  {
    id: 6,
    name: "Power Bank 10000mAh",
    price: 49,
    category: "accessory",
    image: "https://images.unsplash.com/photo-1609592810793-abeb6c64b5c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80",
    description: "Batterie externe rapide - Double port USB",
    features: ["Capacité 10000mAh", "Charge rapide", "Double port USB", "Compact et léger"],
    inStock: true,
    rating: 4.1
  }
];

// @route   GET /api/products
// @desc    Récupérer tous les produits
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, inStock } = req.query;
    
    let filteredProducts = [...products];

    // Filtrer par catégorie
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category
      );
    }

    // Filtrer par disponibilité
    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(product => product.inStock);
    }

    res.json({
      success: true,
      data: { 
        products: filteredProducts,
        total: filteredProducts.length
      }
    });

  } catch (error) {
    console.error('Erreur récupération produits:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// @route   GET /api/products/:id
// @desc    Récupérer un produit spécifique
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé'
      });
    }

    res.json({
      success: true,
      data: { product }
    });

  } catch (error) {
    console.error('Erreur récupération produit:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

// @route   GET /api/products/category/:category
// @desc    Récupérer les produits par catégorie
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const categoryProducts = products.filter(product => 
      product.category === category
    );

    res.json({
      success: true,
      data: { 
        products: categoryProducts,
        total: categoryProducts.length
      }
    });

  } catch (error) {
    console.error('Erreur récupération produits par catégorie:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

module.exports = router;