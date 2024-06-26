import React from 'react';
import { Link } from 'react-router-dom';
import "../estilos/Navbar.css";
import { IoHome } from "react-icons/io5";
import { MdCatchingPokemon } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { MdLogin, MdLogout } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const manejoLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-md navbar-light">
            <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbar-toggler" 
                aria-controls="navbar-toggler" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

                <div className="collapse navbar-collapse justify-content-right" id="navbar-toggler">
                    <p className='title'>Navdex App</p>
                    <ul className="navbar-nav d-flex justify-content-center align-items-center">
                        {!isLoggedIn &&(
                            <li className="navbar-item">
                            <IoHome className='icon' />
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        )}
                        <li className="navbar-item">
                            <MdCatchingPokemon className='icon' />
                            <Link className="nav-link" to="/about">Acerca de</Link>
                        </li>
                        {!isLoggedIn && (
                            <li className="navbar-item">
                                <FaUserPlus className='icon'/>
                                <Link className="nav-link" to="/registrar">Registrar</Link>
                            </li>
                        )}
                        {isLoggedIn ? (
                            <li className="navbar-item">
                                <MdLogout  className='icon'/>
                                <Link to="/logout" className="nav-link" onClick={manejoLogout}>Cerrar</Link>
                            </li>
                        ) : (
                            <li className="navbar-item">
                                <MdLogin  className='icon'/>
                                <Link to="/login" className="nav-link">Acceder</Link>
                            </li>
                        )}
                    </ul>
                </div>
        </nav>
    );
};

export default Navbar;