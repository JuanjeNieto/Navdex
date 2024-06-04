import React, { useState } from 'react';
import '../estilos/PokemonSearch.css';
import { FaSearch } from "react-icons/fa";

const PokemonSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar por ID o nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}><FaSearch /></button>
    </div>
  );
};

export default PokemonSearch;
