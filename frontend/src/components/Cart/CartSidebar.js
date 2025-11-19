import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  toggleCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  checkout,
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen
} from '../../redux/slices/cartSlice';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectIsCartOpen);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    // Simulation de paiement
    alert(`Paiement de ${total} DT effectué avec succès !`);
    dispatch(checkout());
  };

  const handleClose = () => {
    dispatch(toggleCart());
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay active" onClick={handleClose}></div>
      <div className="cart-sidebar active">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Mon Panier</h3>
          <button className="btn btn-sm btn-outline-secondary" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="text-center text-muted py-4">
              <i className="fas fa-shopping-cart fa-3x mb-3"></i>
              <p>Votre panier est vide</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="cart-item d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <small className="text-muted">{item.price} DT</small>
                  </div>
                  
                  <div className="d-flex align-items-center gap-2">
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    
                    <span className="mx-2">{item.quantity}</span>
                    
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                    
                    <button 
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-total mt-4 pt-4 border-top">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Total:</h5>
              <h4 className="mb-0 text-primary">{total} DT</h4>
            </div>
            
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-danger flex-grow-1"
                onClick={() => dispatch(clearCart())}
              >
                <i className="fas fa-trash"></i> Vider
              </button>
              <button 
                className="btn btn-success flex-grow-1"
                onClick={handleCheckout}
              >
                <i className="fas fa-credit-card"></i> Payer
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;