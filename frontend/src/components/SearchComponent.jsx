import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const params = new URLSearchParams(location.search);
      params.set("search", searchTerm.trim());
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center max-w-md mx-auto mb-8"
    >
      <input
        type="text"
        placeholder="Search products or categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition"
      >
        <FiSearch />
      </button>
    </form>
  );
};

export default SearchBar;
