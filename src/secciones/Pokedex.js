import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import Pokemon from '../componentes/Pokemon'; 
import '../estilos/pokedex.css';

const Pokedex = () => {
    const [pokemonOptions, setPokemonOptions] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingPokemon, setAddingPokemon] = useState(false); // Nuevo estado de carga
    const location = useLocation();
    const usuarioLogueado = location.state ? location.state.usuario : 'Usuario';

    useEffect(() => {
        fetchRandomPokemon();
    }, []);

    const fetchRandomPokemon = async () => {
        try {
            setLoading(true); // Activar el estado de carga
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1025'); 
            const pokemonList = response.data.results;
            const randomPokemon = [];

            for (let i = 0; i < 5; i++) {
                const randomIndex = Math.floor(Math.random() * pokemonList.length);
                const pokemon = await axios.get(pokemonList[randomIndex].url);
                randomPokemon.push(pokemon.data);
            }

            setPokemonOptions(randomPokemon);
            setLoading(false); // Desactivar el estado de carga
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            setLoading(false); // Asegúrate de desactivar el estado de carga en caso de error
        }
    };

    const addToTeam = async (pokemon) => {
        if (selectedPokemon.length < 6) {
            setAddingPokemon(true); // Activar el estado de carga
            const updatedTeam = [...selectedPokemon, pokemon];
            setSelectedPokemon(updatedTeam);
            await fetchRandomPokemon(); // Espera a que la lista de Pokémon se actualice
            setAddingPokemon(false); // Desactivar el estado de carga después de agregar el Pokémon
        } else {
            alert('You can only select up to 6 Pokémon for your team.');
        }
    };

    const removeFromTeam = (pokemon) => {
        const updatedTeam = selectedPokemon.filter((p) => p !== pokemon);
        setSelectedPokemon(updatedTeam);
    };

    return (
        <div className="pokedex-container">
            <h1>Randomdex de: {usuarioLogueado}</h1>
            <div>
                <h2>Options:</h2>
                <button onClick={fetchRandomPokemon} className='refresh-button'>Refresh</button>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="pokemon-options">
                        {pokemonOptions.map((pokemon, index) => (
                            <div key={index} className="pokemon-card-show">
                                <Pokemon pokemon={pokemon} onClick={() => addToTeam(pokemon)} />
                                {addingPokemon && <div className="loading-indicator"></div>}
                                <button onClick={() => addToTeam(pokemon)}>Add</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <h2>Team:</h2>
                <div className="pokemon-team">
                    {selectedPokemon.map((pokemon, index) => (
                        <div key={index} className="pokemon-card-team">
                            <Pokemon pokemon={pokemon} onClick={() => removeFromTeam(pokemon)} />
                            <button onClick={() => removeFromTeam(pokemon)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pokedex;
