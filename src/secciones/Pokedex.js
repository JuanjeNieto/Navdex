import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../estilos/pokedex.css';
import gameImageUrls from '../componentes/GameImages';
import { translateGameName, translateGameNameInverse } from '../componentes/GameTranslations'; // Importa la función inversa
import FilterSidebar from '../componentes/FilterSidebar';
import { Link } from 'react-router-dom';

const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char, index) => {
        if (index > 0 && /[áéíóúÁÉÍÓÚ]/.test(str[index - 1])) {
            return char.toLowerCase();
        }
        return char.toUpperCase();
    });
};

const romanNumerals = {
    'i': 1,
    'ii': 2,
    'iii': 3,
    'iv': 4,
    'v': 5,
    'vi': 6,
    'vii': 7,
    'viii': 8,
    'ix': 9,
    'x': 10
};

const Pokedex = () => {
    const [pokemonGames, setPokemonGames] = useState({});
    const [loading, setLoading] = useState(true);
    // Establece todas las generaciones seleccionadas por defecto
    const [selectedGenerations, setSelectedGenerations] = useState([]);
    const [selectAll, setSelectAll] = useState(true); // Establece selectAll en true por defecto

    useEffect(() => {
        const fetchAllGenerations = async () => {
            try {
                setLoading(true);
                const generationsResponse = await axios.get('https://pokeapi.co/api/v2/generation');
                const generations = generationsResponse.data.results;

                const sortedGenerations = generations.sort((a, b) => {
                    const aRoman = a.name.split('-')[1];
                    const bRoman = b.name.split('-')[1];
                    return romanNumerals[aRoman] - romanNumerals[bRoman];
                });

                const gamesByGeneration = {};

                await Promise.all(sortedGenerations.map(async (generation) => {
                    const generationDetails = await axios.get(generation.url);
                    const generationNumber = romanNumerals[generation.name.split('-')[1]];
                    const generationName = `${generationNumber}ª Generación`;
                    const games = await Promise.all(
                        generationDetails.data.version_groups.map(async (group) => {
                            const groupDetails = await axios.get(group.url);
                            return groupDetails.data.versions.map((version) => ({
                                name: capitalizeWords(translateGameName(version.name)),
                                imageUrl: gameImageUrls[version.name.toLowerCase()],
                                generation: generationName,
                                console: groupDetails.data.platform ? groupDetails.data.platform.name : 'Desconocida'
                            }));
                        })
                    );
                    gamesByGeneration[generationName] = games.flat();
                }));

                console.log('Games by Generation:', gamesByGeneration); // Debug
                setPokemonGames(gamesByGeneration);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokémon games data:', error);
                setLoading(false);
            }
        };

        fetchAllGenerations();
    }, []);

    useEffect(() => {
        if (selectAll) {
            setSelectedGenerations(Object.keys(pokemonGames));
        }
    }, [selectAll, pokemonGames]);

    const handleGenerationChange = (event) => {
        const { value, checked } = event.target;
        if (value === 'Todas') {
            if (checked) {
                setSelectedGenerations(Object.keys(pokemonGames));
                setSelectAll(true);
            } else {
                setSelectedGenerations([]);
                setSelectAll(false);
            }
        } else {
            if (checked) {
                setSelectedGenerations(prevState => [...prevState, value]);
            } else {
                setSelectedGenerations(prevState => prevState.filter(gen => gen !== value));
            }
            // Si se desmarca una generación, desmarca también "Todas"
            if (selectAll) {
                setSelectAll(false);
            }
        }
    };

    useEffect(() => {
        if (selectedGenerations.length === Object.keys(pokemonGames).length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedGenerations, pokemonGames]);

    const filteredGames = selectedGenerations.length > 0
        ? Object.keys(pokemonGames)
            .filter(generation => selectedGenerations.includes(generation))
            .reduce((obj, key) => {
                obj[key] = pokemonGames[key];
                return obj;
            }, {})
        : {};

    return (
        <div className="pokedex-container container">
            <h1>Lista de Juegos de Pokémon</h1>
            <div className="row">
                <FilterSidebar
                    pokemonGames={pokemonGames}
                    selectedGenerations={selectedGenerations}
                    selectAll={selectAll}
                    handleGenerationChange={handleGenerationChange}
                />
                <div className="pokemon-games col-md-9">
                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        selectedGenerations.length > 0 ? (
                            Object.keys(filteredGames).sort((a, b) => {
                                const aNum = parseInt(a.split('ª')[0], 10);
                                const bNum = parseInt(b.split('ª')[0], 10);
                                return aNum - bNum;
                            }).map((generation, index) => (
                                <div key={index} className="pokemon-generation">
                                    <h2>{generation}</h2>
                                    <div className="games-container">
                                        {filteredGames[generation].map((game, gameIndex) => (
                                            <Link to={`/game/${translateGameNameInverse(game.name)}`} key={gameIndex} className="pokemon-game">    
                                                <div key={gameIndex}>
                                                    <img src={game.imageUrl} alt={game.name} className="pokemon-game-image" />
                                                    <div className="pokemon-game-details">
                                                        <p><strong>{capitalizeWords(translateGameName(game.name))}</strong></p> {/* Utiliza translateGameName para mostrar el nombre del juego */}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay generaciones seleccionadas.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pokedex;
