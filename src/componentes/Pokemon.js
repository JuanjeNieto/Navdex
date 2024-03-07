import React from 'react';
import '../estilos/pokedex.css';

// Componente funcional Pokemon que muestra los detalles de un Pokémon
const Pokemon = ({ pokemon }) => {
    // Extraer datos del objeto pokemon
    const { name, sprites, types } = pokemon;

    // Función para capitalizar la primera letra de una cadena
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Encontrar el tipo primario y secundario del Pokémon
    const primaryType = types.find((type) => type.slot === 1);
    const secondaryType = types.find((type) => type.slot === 2);

    return (
        <div className="pokemon-card">
            {/* Mostrar la imagen del Pokémon */}
            <img src={sprites.front_default} alt={name} />
            {/* Mostrar el nombre del Pokémon capitalizado */}
            <h3>{capitalizeFirstLetter(name)}</h3>
            <div className="types">
                {/* Mostrar el tipo primario si está presente */}
                {primaryType && (
                    <p key={primaryType.type.name} className={`type-pokemon ${primaryType.type.name}`}>
                        {capitalizeFirstLetter(primaryType.type.name)}
                    </p>
                )}
                {/* Mostrar el tipo secundario si está presente */}
                {secondaryType && (
                    <p key={secondaryType.type.name} className={`type-pokemon ${secondaryType.type.name}`}>
                        {capitalizeFirstLetter(secondaryType.type.name)}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Pokemon;
