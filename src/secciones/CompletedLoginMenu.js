import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../estilos/CompletedLoginMenu.css'; // Archivo CSS para estilos

const CompletedLoginMenu = () => {
    const location = useLocation();
    const usuario = location.state ? location.state.usuario : 'Usuario';

    return (
        <div className="menu-container">
            <h2>Bienvenido!</h2>
            <div className="menu-options">
                <Link to="/pokedex" className="menu-option lista-juegos"><div className='texto-link'>Lista de Juegos</div></Link>
                <Link to="/poketable" className="menu-option tabla-pokemon"><div className='texto-link'>Tabla de Pokemon</div></Link>
                
                <Link to="/profile" className="menu-option perfil-usuario"><div className='texto-link'>Perfil de Usuario</div></Link>
            </div>
        </div>
    );
};

export default CompletedLoginMenu;
