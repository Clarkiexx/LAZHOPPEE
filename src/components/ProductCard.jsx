import React from "react";

const ProductCard = ({ product, onClick, onAddToCart }) => (
  <div className="product-card" onClick={() => onClick(product)}>
    <img src={product.thumbnail} alt={product.title} />
    <h3>{product.title}</h3>
    <p>Price: ₱{product.price}</p>
    <p>Category: {product.category}</p>
    <button onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
      Add to Cart
    </button>
  </div>
);

export default ProductCard;