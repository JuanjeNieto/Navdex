import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import imagen1 from '../images/Pokemon-Leyendas-Z.webp';
import imagen2 from '../images/pokemon-za.jpg';
import imagen3 from '../images/leyendas-pokemon-za.jpg.webp';
import imagen4 from '../images/quasar-leyendas-pokemon-za.jpg.webp';
const Carrusel = () => {
    return (
        <div id="demo" className="carousel slide mb-4" data-bs-ride="carousel" data-bs-interval="50">

            <div className="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
            </div>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={imagen1} alt="Título del juego" className="d-block w-100" />
                </div>
                <div className="carousel-item">
                    <img src={imagen2} alt="Torre Luminalia" className="d-block w-100" />
                </div>
                <div className="carousel-item">
                    <img src={imagen3} alt="Mapa Luminalia completo" className="d-block w-100"/>
                </div>
                <div className="carousel-item">
                    <img src={imagen4} alt="Logo Quasar" className="d-block w-100"/>
                </div>
            </div>
        </div>
    );
}

export default Carrusel;