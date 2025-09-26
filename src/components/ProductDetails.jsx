import React from "react";

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="product-details">
      <button onClick={onClose}>Close</button>
      <img src={product.thumbnail} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>Discount: {product.discountPercentage}%</p>
      <p>Rating: {product.rating}</p>
      {/* Show more images if you want */}
      <div>
        {product.images && product.images.map((img, idx) => (
          <img key={idx} src={img} alt={`img-${idx}`} style={{ width: "50px", margin: "2px" }} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;