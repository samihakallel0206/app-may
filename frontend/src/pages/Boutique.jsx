import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';

const Boutique = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'mobile', name: 'Smartphones' },
    { id: 'watch', name: 'Montres connectées' },
    { id: 'laptop', name: 'Ordinateurs' },
    { id: 'headphones', name: 'Écouteurs' }
  ];

  const productsData = [
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
    }
  ];

  useEffect(() => {
    // Simuler le chargement des produits
    const loadProducts = async () => {
      setLoading(true);
      setTimeout(() => {
        setProducts(productsData);
        setLoading(false);
      }, 1000);
    };

    loadProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    }));
    
    alert(`${product.name} ajouté au panier !`);
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <div className="text-center py-5">
            <div className="loading"></div>
            <p className="mt-3">Chargement des produits...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Boutique Ooredoo</h1>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Retour au Dashboard
          </button>
        </div>

        {/* Filtres par catégorie */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Liste des produits */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {!product.inStock && (
                  <div className="position-absolute top-0 start-0 m-2">
                    <span className="badge bg-danger">Rupture de stock</span>
                  </div>
                )}
              </div>
              
              <div className="product-info">
                <h4 className="product-title">{product.name}</h4>
                <p className="text-muted product-description">{product.description}</p>
                
                <div className="mb-2">
                  <span className="text-warning">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </span>
                  <small className="text-muted ms-2">({product.rating})</small>
                </div>
                
                <h5 className="text-primary product-price">{product.price} DT</h5>
                
                <button 
                  className="btn-add-cart"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? (
                    <>
                      <i className="fas fa-cart-plus me-2"></i>
                      Ajouter au Panier
                    </>
                  ) : (
                    'Rupture de Stock'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun produit */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">Aucun produit trouvé</h4>
            <p className="text-muted">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}

        {/* Promotion */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="forfait-card text-center bg-primary text-white">
              <h3 className="text-white">
                <i className="fas fa-gift me-2"></i>
                Promotion Spéciale
              </h3>
              <p className="mb-3">
                Livraison gratuite pour toute commande supérieure à 200 DT !
              </p>
              <button className="btn btn-light">
                Voir les conditions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boutique;