import { createSlice } from '@reduxjs/toolkit';

// État initial du panier
const initialState = {
  items: [],
  total: 0,
  isCartOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Ajouter un produit au panier
    addToCart: (state, action) => {
      const { id, name, price, image, category } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ 
          id, 
          name, 
          price, 
          image, 
          category,
          quantity: 1 
        });
      }
      
      // Recalculer le total
      state.total = state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      );
      
      // Sauvegarder dans le localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    // Retirer un produit du panier
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      
      // Recalculer le total
      state.total = state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      );
      
      // Sauvegarder dans le localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    // Modifier la quantité d'un produit
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else if (item && quantity === 0) {
        state.items = state.items.filter(item => item.id !== id);
      }
      
      // Recalculer le total
      state.total = state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      );
      
      // Sauvegarder dans le localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    // Vider le panier
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cart');
    },
    
    // Ouvrir/fermer le panier
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    
    // Charger le panier depuis le localStorage
    loadCartFromStorage: (state) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        state.items = cartData.items || [];
        state.total = cartData.total || 0;
      }
    },
    
    // Passer la commande
    checkout: (state) => {
      // Ici vous pouvez ajouter la logique pour envoyer la commande au backend
      state.items = [];
      state.total = 0;
      state.isCartOpen = false;
      localStorage.removeItem('cart');
    }
  }
});

// Export des actions
export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart,
  loadCartFromStorage,
  checkout
} = cartSlice.actions;

// Sélecteurs
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectIsCartOpen = (state) => state.cart.isCartOpen;

export default cartSlice.reducer;