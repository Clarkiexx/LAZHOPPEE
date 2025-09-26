import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => (
  <input
    type="text"
    placeholder="Search an Item..."
    value={searchTerm}
    onChange={(e) => onSearch(e.target.value)}
    style={{ margin: "10px", padding: "5px", width: "200px" }}
  />
);

export default SearchBar;