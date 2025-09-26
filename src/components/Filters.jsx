import React from "react";

const Filters = ({ categories, selectedCategory, onCategoryChange }) => (
  <select
    value={selectedCategory}
    onChange={(e) => onCategoryChange(e.target.value)}
    style={{ margin: "10px", padding: "5px" }}
  >
    <option value="">All Categories</option>
    {categories.map((cat) => (
      <option key={cat} value={cat}>{cat}</option>
    ))}
  </select>
);

export default Filters;