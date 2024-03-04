import React from 'react';
import '../estilos/about.css';
import fairyImage from '../images/fairy.gif';
const About = () => {
    return (
        <div className="about-container">
            <h1>Acerca de Pokémon X e Y</h1>
            <p>Pokémon X e Y son dos videojuegos de rol desarrollados por Game Freak y distribuidos por Nintendo y The Pokémon Company para la consola Nintendo 3DS. Fueron lanzados en octubre de 2013 como la sexta generación de la serie Pokémon.</p>
            
            <div className="section">
                <h2>Novedades</h2>
                <p>Estos juegos introdujeron varias novedades en la serie, incluyendo gráficos en 3D, un nuevo tipo de Pokémon (hada) <img src = {fairyImage} width={80} alt='fairy'></img>, Megaevoluciones, y la región de Kalos.</p>
            </div>
            
            <div className="section">
                <h2>Historia</h2>
                <p>La historia de Pokémon X e Y sigue al jugador mientras viaja por la región de Kalos, desafiando a otros entrenadores Pokémon, completando la Pokédex regional y deteniendo los planes de la malvada organización Team Flare.</p>
            </div>
            
            <div className="section">
                <h2>Legendarios</h2>
                <p>Entre los Pokémon legendarios de X e Y se encuentran <a href="https://pokemondb.net/pokedex/xerneas"><img src="https://img.pokemondb.net/sprites/home/normal/xerneas-active.png" alt="Xerneas" className="pokemon-img"/></a> Xerneas, el Pokémon Vida de X, <a href="https://pokemondb.net/pokedex/yveltal"><img src="https://img.pokemondb.net/sprites/home/normal/yveltal.png" alt="Yveltal" className="pokemon-img"/></a> Yveltal, el Pokémon Destino de Y, y <a href="https://pokemondb.net/pokedex/zygarde"><img src="https://img.pokemondb.net/sprites/home/normal/zygarde-complete.png" alt="Zygarde" className="pokemon-img"/></a> Zygarde, el guardián de Kalos.</p>
            </div>
        </div>
    );
};

export default About;
