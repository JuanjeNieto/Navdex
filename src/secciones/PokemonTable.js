import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PokemonSearch from '../componentes/PokemonSearch';
import '../estilos/PokemonTable.css';

const generations = [
    { gen: 1, limit: 151, offset: 0 },
    { gen: 2, limit: 100, offset: 151 },
    { gen: 3, limit: 135, offset: 251 },
    { gen: 4, limit: 107, offset: 386 },
    { gen: 5, limit: 156, offset: 493 },
    { gen: 6, limit: 72, offset: 649 },
    { gen: 7, limit: 88, offset: 721 },
    { gen: 8, limit: 96, offset: 809 },
    { gen: 9, limit: 120, offset: 905 },
];

const PokemonTable = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [currentGen, setCurrentGen] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchPokemons = useCallback(async (gen, offset = 0, limit = 100) => {
    setLoading(true);
    try {
      const { offset: genOffset, limit: genLimit } = generations.find(g => g.gen === gen);
      const adjustedLimit = Math.min(limit, genLimit - offset); // LIMITE
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${adjustedLimit}&offset=${genOffset + offset}`);
      const pokemonResults = response.data.results;

      const pokemonDetailsPromises = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );

      const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
      const pokemonsBatch = pokemonDetailsResponses.map((response) => response.data);

      return pokemonsBatch;
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadInitialPokemons = async () => {
      setLoading(true);
      const initialPokemons = await fetchPokemons(currentGen);
      setPokemons(initialPokemons);
      setFilteredPokemons(initialPokemons);
      setLoading(false);
      setCurrentOffset(initialPokemons.length);
      setHasMore(initialPokemons.length > 0);
    };

    loadInitialPokemons();
  }, [currentGen, fetchPokemons]);

  const handleScroll = useCallback(async () => {
    const { limit: genLimit } = generations.find(g => g.gen === currentGen);
    if (!loading && hasMore && window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      setLoading(true);
      const newPokemons = await fetchPokemons(currentGen, currentOffset);
      setPokemons(prev => [...prev, ...newPokemons]);
      setFilteredPokemons(prev => [...prev, ...newPokemons]);
      setCurrentOffset(prev => prev + newPokemons.length);
      setHasMore(currentOffset + newPokemons.length < genLimit);
      setLoading(false);
    }
  }, [loading, hasMore, currentOffset, currentGen, fetchPokemons]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSearch = (searchTerm) => {
    if (!loading) {
      if (searchTerm === '') {
        setFilteredPokemons(pokemons);
      } else {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = pokemons.filter(pokemon =>
          pokemon.name.includes(lowerCaseSearchTerm) ||
          pokemon.id.toString().includes(searchTerm)
        );
        setFilteredPokemons(filtered);
      }
    }
  };

  const handleRowClick = (id) => {
    navigate(`/pokemon/${id}`);
  };

  const handleGenChange = (gen) => {
    setCurrentGen(gen);
    setCurrentOffset(0);
    setHasMore(true);
    setPokemons([]);
    setFilteredPokemons([]);
  };

  return (
    <div className='container'>
      <PokemonSearch onSearch={handleSearch} />
      <div className="table-container">
        <div className="tabs">
          {generations.map(({ gen }) => (
            <button
              key={gen}
              className={gen === currentGen ? 'active' : ''}
              onClick={() => handleGenChange(gen)}
            >
              Gen {gen}
            </button>
          ))}
        </div>
        {loading && currentOffset === 0 ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Sprite</th>
              </tr>
            </thead>
            <tbody>
              {filteredPokemons.map((pokemon) => (
                <tr key={pokemon.id} onClick={() => handleRowClick(pokemon.id)}>
                  <td>{pokemon.id}</td>
                  <td>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</td>
                  <td>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {loading && currentOffset > 0 && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonTable;
