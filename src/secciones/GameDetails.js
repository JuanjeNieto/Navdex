import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import gameImageUrls from '../componentes/GameImages';
import gameIds from '../componentes/gameIds';
import { translateGameName } from '../componentes/GameTranslations'; // Importa la función de traducción
import '../estilos/gameDetails.css';
import { translateMoveMethod } from '../componentes/MoveMethodTranslations';

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

const GameDetails = () => {
    const { name } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const gameId = gameIds[name];
                if (!gameId) {
                    throw new Error(`No se encontró ID para el juego: ${name}`);
                }

                const response = await axios.get(`https://pokeapi.co/api/v2/version/${gameId}`);
                const versionData = response.data;

                if (!versionData) {
                    throw new Error(`Los datos de la versión del juego no están disponibles.`);
                }

                let generationName = 'Desconocida';
                let region = 'Desconocida';
                if (versionData.version_group && versionData.version_group.url) {
                    const versionGroupResponse = await axios.get(versionData.version_group.url);
                    const versionGroupData = versionGroupResponse.data;
                    if (versionGroupData.generation) {
                        generationName = versionGroupData.generation.name;
                    }
                    if (versionGroupData.regions && versionGroupData.regions.length > 0) {
                        region = versionGroupData.regions.map(region => region.name).join(', ');
                    }
                }
                
                // Split del nombre de la generación para extraer los números romanos
                const romanNumeralsArray = generationName.toLowerCase().match(/i[vx]|v?i{0,3}$/g);

                // Mapeo de números romanos a sus equivalentes numéricos y unión
                const numericGeneration = romanNumeralsArray.map(roman => romanNumerals[roman]).join('');

                const translatedName = translateGameName(versionData.name.toLowerCase()); // Traduce el nombre del juego

                let moveLearnMethods = [];
            if (versionData.version_group && versionData.version_group.url) {
                const versionGroupResponse = await axios.get(versionData.version_group.url);
                const versionGroupData = versionGroupResponse.data;
                moveLearnMethods = versionGroupData.move_learn_methods.length > 0 ? 
                versionGroupData.move_learn_methods.map(method => translateMoveMethod(method.name) || method.name) : 
                ['No se encontraron métodos en este juego'];
            }

                setGameDetails({
                    name: translatedName,
                    generation: numericGeneration,
                    imageUrl: gameImageUrls[versionData.name.toLowerCase()],
                    region: region,
                    moveLearnMethods: moveLearnMethods
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching game details:', error);
                setError('Error al obtener los detalles del juego.');
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [name]);

    if (loading) {
        return <p className="text-center">Cargando...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">{error}</p>;
    }

    if (!gameDetails) {
        return <p className="text-center">No se encontraron detalles para el juego {name}.</p>;
    }

    return (
        <div className="container game-details-container">
            <h1>{capitalizeWords(gameDetails.name)}</h1>
            <img src={gameDetails.imageUrl} alt={gameDetails.name} className="img-fluid" />
            <p>{gameDetails.generation}ª Generación</p>
            <p>Región: {capitalizeWords(gameDetails.region)}</p>
            <p>Métodos de aprendizaje de movimientos: {capitalizeWords(gameDetails.moveLearnMethods.join(', '))}</p>
        </div>
    );
};

export default GameDetails;
