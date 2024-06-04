import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../estilos/PokemonDetail.css';

const typeColors = {
  normal: '#A8A878',
  fighting: '#C03028',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
};

const typeTranslations = {
  normal: 'Normal',
  fighting: 'Lucha',
  flying: 'Volador',
  poison: 'Veneno',
  ground: 'Tierra',
  rock: 'Roca',
  bug: 'Bicho',
  ghost: 'Fantasma',
  steel: 'Acero',
  fire: 'Fuego',
  water: 'Agua',
  grass: 'Planta',
  electric: 'Eléctrico',
  psychic: 'Psíquico',
  ice: 'Hielo',
  dragon: 'Dragón',
  dark: 'Siniestro',
  fairy: 'Hada',
};

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);

        const speciesResponse = await axios.get(response.data.species.url);
        setSpecies(speciesResponse.data);

        const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
        const evolutionData = evolutionResponse.data;
        let evolutionChain = [];
        let current = evolutionData.chain;

        do {
          const evolvesTo = current.evolves_to.map(e => e.species.name);
          evolutionChain.push({ name: current.species.name, evolvesTo });
          current = current.evolves_to[0];
        } while (current && current.evolves_to);

        setEvolutions(evolutionChain);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!pokemon) {
    return <div>No se encontró el Pokémon.</div>;
  }

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>ID: {pokemon.id}</p>
      <div>
        <p>Tipos:</p>
        <ul>
          {pokemon.types.map((typeInfo) => (
            <li key={typeInfo.type.name} style={{ backgroundColor: typeColors[typeInfo.type.name] }}>
              {typeTranslations[typeInfo.type.name]}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>Evoluciones:</p>
        <ul>
          {evolutions.map((evolution, index) => (
            <li key={index}>
              {evolution.name}
              {evolution.evolvesTo.length > 0 && ' -> ' + evolution.evolvesTo.join(', ')}
            </li>
          ))}
        </ul>
      </div>
      {species && species.varieties.length > 1 && (
        <div>
          <p>Formas:</p>
          <ul>
            {species.varieties.map((variety) => (
              <li key={variety.pokemon.name}>{variety.pokemon.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
