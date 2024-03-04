import React from 'react';
import '../estilos/pokedex.css';

const Pokemon = ({ pokemon, addToTeam }) => {
    const { name, sprites, types } = pokemon;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const primaryType = types.find((type) => type.slot === 1);
    const secondaryType = types.find((type) => type.slot === 2);

    return (
        <div className="pokemon-card">
            <img src={sprites.front_default} alt={name} />
            <h3>{capitalizeFirstLetter(name)}</h3>
            <div className="types">
            
                {primaryType && (
                    <p key={primaryType.type.name} className={`type-pokemon ${primaryType.type.name}`}>
                        {capitalizeFirstLetter(primaryType.type.name)}
                    </p>
                )}
               
                {secondaryType && (
                    <p key={secondaryType.type.name} className={`type-pokemon ${secondaryType.type.name}`}>
                        {capitalizeFirstLetter(secondaryType.type.name)}
                    </p>
                )}
            </div>
            <button onClick={() => addToTeam(pokemon)}>Add to Team</button>
        </div>
    );
};

export default Pokemon;
