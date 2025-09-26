import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import Cart from "./Cart";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setCategories([...new Set(data.products.map((p) => p.category))]);
      });
  }, []);

  // Filter products by search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove from cart handler
  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Checkout handler
  const handleCheckout = () => {
    alert("Checkout successful! Thank you for your purchase.");
    setCartItems([]);
  };

  return (
    <div>
      <div className="top-bar">
        <div className="search-bar-container">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        </div>
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      </div>
      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      {/* Cart modal */}
      {cartOpen && (
        <div className="modal-overlay" onClick={() => setCartOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <Cart
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
              onCheckout={handleCheckout}
            />
            <button style={{marginTop: '12px'}} onClick={() => setCartOpen(false)}>Close</button>
          </div>
        </div>
      )}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <ProductDetails
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;