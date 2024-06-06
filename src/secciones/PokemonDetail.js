import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../estilos/PokemonDetail.css';
import { translateMoveMethod } from '../componentes/MoveMethodTranslations';

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
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [moves, setMoves] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const [pokemonResponse, locationResponse] = await Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`),
        ]);

        const pokemonData = pokemonResponse.data;
        setPokemon(pokemonData);

        const speciesResponse = await axios.get(pokemonData.species.url);
        const speciesData = speciesResponse.data;
        setSpecies(speciesData);

        const evolutionResponse = await axios.get(speciesData.evolution_chain.url);
        const evolutionData = evolutionResponse.data;

        const evolutionChain = [];
        let current = evolutionData.chain;
        do {
          const evolvesTo = current.evolves_to.map(e => e.species.name);
          evolutionChain.push({ name: current.species.name, evolvesTo });
          current = current.evolves_to[0];
        } while (current && current.evolves_to);

        setEvolutions(evolutionChain);

        const locationData = await Promise.all(locationResponse.data.map(async (location) => {
          const locationAreaResponse = await axios.get(location.location_area.url);
          const locationName = locationAreaResponse.data.names.find(name => name.language.name === 'es');
          return locationName ? locationName.name : location.location_area.name;
        }));
        setLocations(locationData);

        const movesData = await Promise.all(pokemonData.moves.map(async (move) => {
          const moveResponse = await axios.get(move.move.url);
          const moveName = moveResponse.data.names.find(name => name.language.name === 'es');
          const moveType = moveResponse.data.type.name;
          return {
            name: moveName ? moveName.name : move.move.name,
            level: move.version_group_details[0].level_learned_at,
            method: move.version_group_details[0].move_learn_method.name,
            type: moveType,
          };
        }));

        setMoves(await Promise.all(movesData.map(async (move) => ({
          ...move,
          method: await translateMoveMethod(move.method) || move.method,
        }))));

      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
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

  const renderMoves = () => {
    const groupedMoves = moves.reduce((acc, move) => {
      const method = move.method;
      if (!acc[method]) {
        acc[method] = [];
      }
      acc[method].push(move);
      return acc;
    }, {});

    return Object.keys(groupedMoves).map((method, index) => (
      <div key={index} className="moves-section">
        <h2>{translateMoveMethod(method)}</h2>
        <ul className="moves-list">
          {groupedMoves[method].map((move, i) => (
            <li key={i} className="move" style={{ backgroundColor: typeColors[move.type] }}>
              {move.name} {move.level > 0 && `(Nivel ${move.level})`} - {typeTranslations[move.type]}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  const renderForms = () => {
    if (!species || species.varieties.length <= 1) {
      return null;
    }

    return (
      <div className="forms-section">
        <p>Formas:</p>
        <ul>
          {species.varieties.map((variety) => {
            if (variety.pokemon.name === pokemon.name) return null;
            return (
              <li key={variety.pokemon.name} onClick={() => navigate(`/pokemon/${variety.pokemon.name}`)}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${variety.pokemon.url.split('/')[6]}.png`}
                  alt={variety.pokemon.name}
                />
                {variety.pokemon.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>#{pokemon.id}</p>
      <div>
        <ul className="type-list">
          {pokemon.types.map((typeInfo) => (
            <li key={typeInfo.type.name} style={{ backgroundColor: typeColors[typeInfo.type.name] }}>
              {typeTranslations[typeInfo.type.name]}
            </li>
          ))}
        </ul>
      </div>
      <div className="evolutions-section">
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
      {renderForms()}
      <div className="moves-section">
        <p>Movimientos:</p>
        {renderMoves()}
      </div>
      <div className="locations-section">
        <p>Ubicaciones:</p>
        <ul>
          {locations.map((location, index) => (
            <li key={index}>
              {location}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;
