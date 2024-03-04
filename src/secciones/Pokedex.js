// Pokedex.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Pokemon from '../componentes/Pokemon'; 
import '../estilos/pokedex.css';

const Pokedex = () => {
    const [pokemonOptions, setPokemonOptions] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const usuarioLogueado = location.state ? location.state.usuario : 'Usuario';

    useEffect(() => {
        fetchRandomPokemon();
    }, []);

    const fetchRandomPokemon = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1025'); 
            const pokemonList = response.data.results;
            const randomPokemon = [];

            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * pokemonList.length);
                const pokemon = await axios.get(pokemonList[randomIndex].url);
                randomPokemon.push(pokemon.data);
            }

            setPokemonOptions(randomPokemon);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    };

    const addToTeam = (pokemon) => {
        if (selectedPokemon.length < 6) {
            setSelectedPokemon([...selectedPokemon, pokemon]);
        } else {
            alert('You can only select up to 6 Pokémon for your team.');
        }
    };

    const removeFromTeam = (pokemon) => {
        const updatedTeam = selectedPokemon.filter((p) => p !== pokemon);
        setSelectedPokemon(updatedTeam);
    };

    const refreshRandomPokemon = () => {
        setLoading(true);
        fetchRandomPokemon();
    };

    return (
        <div className="pokedex-container">
            <h1>Randomdex de: {usuarioLogueado}</h1>
            <div>
                <h2>Options:</h2>
                <button onClick={refreshRandomPokemon} className='refresh-button'>Refresh</button>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="pokemon-options">
                        {pokemonOptions.map((pokemon, index) => (
                            <Pokemon key={index} pokemon={pokemon} addToTeam={addToTeam} />
                        ))}
                    </div>
                )}
            </div>
            <div>
                <h2>Team:</h2>
                <div className="pokemon-team">
                    {selectedPokemon.map((pokemon, index) => (
                        <div key={index} className="pokemon-card">
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <h3>{pokemon.name}</h3>
                            <button onClick={() => removeFromTeam(pokemon)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pokedex;
