import React, { useEffect, useState } from 'react';
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        let allPokemons = [];
        for (const { limit, offset } of generations) {
          for (let i = offset; i < offset + limit; i += 100) {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${Math.min(100, offset + limit - i)}&offset=${i}`);
            const pokemonResults = response.data.results;

            const pokemonDetailsPromises = pokemonResults.map((pokemon) =>
              axios.get(pokemon.url)
            );

            const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
            const pokemonsBatch = pokemonDetailsResponses.map((response) => response.data);
            
            allPokemons = [...allPokemons, ...pokemonsBatch];
          }
        }

        setPokemons(allPokemons);
        setFilteredPokemons(allPokemons);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    if (!loading) {
      const { limit, offset } = generations.find(gen => gen.gen === currentGen);
      const genPokemons = pokemons.slice(offset, offset + limit);
      setFilteredPokemons(genPokemons);
    }
  }, [currentGen, pokemons, loading]);

  const handleSearch = (searchTerm) => {
    if (!loading) {
      if (searchTerm === '') {
        const { limit, offset } = generations.find(gen => gen.gen === currentGen);
        const genPokemons = pokemons.slice(offset, offset + limit);
        setFilteredPokemons(genPokemons);
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

  return (
    <div className='container'>
      <PokemonSearch onSearch={handleSearch} />
      <div className="table-container">
        <div className="tabs">
          {generations.map(({ gen }) => (
            <button
              key={gen}
              className={gen === currentGen ? 'active' : ''}
              onClick={() => setCurrentGen(gen)}
            >
              Gen {gen}
            </button>
          ))}
        </div>
        {loading ? (
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
      </div>
    </div>
  );
};

export default PokemonTable;
