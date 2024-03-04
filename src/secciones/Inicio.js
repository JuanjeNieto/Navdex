import React from 'react';
import Carrusel from '../componentes/Carrusel';
import '../estilos/Inicio.css'; 

const Inicio = () => {
    return (
        <div className='container'>
            <h1>Has abierto el PC de Juanje.</h1>
            
            <p>Leyendas: Pokémon Z-A, la última novedad</p>
            <Carrusel/>
        </div>
    );
}

export default Inicio;
