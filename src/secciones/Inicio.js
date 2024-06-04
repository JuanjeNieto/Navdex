import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Inicio.css';


const Inicio = () => {
    return (
        <div className='inicio-container'>
            <div className='background-overlay'>
                <h1>Bienvenido a Navdex</h1>
                <p>Descubre +30 juegos y +1000 especies</p>
                <div className="buttons">
                    <Link to="/login" className="btn-primary">
                        Iniciar Sesión
                    </Link>
                    <Link to="/registrar" className="btn-secondary">
                        Registrarse
                    </Link>
                </div>
            </div>
            
        </div>
    );
}

export default Inicio;
