import React from "react";

const Cart = ({ cartItems, onRemoveFromCart, onCheckout }) => (
  <div className="cart">
    <h2>Cart</h2>
    {cartItems.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price} x {item.quantity}
            <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    )}
    {cartItems.length > 0 && (
      <button onClick={onCheckout}>Checkout</button>
    )}
  </div>
);

export default Cart;