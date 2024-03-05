import React, { useState } from 'react';
import '../estilos/Registro.css'; // Archivo CSS para estilos
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Login = ({ setIsLoggedIn }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const manejoCambio = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const manejoEnvio = async (e) => {
        e.preventDefault();
    
        if (!credentials.username || !credentials.password) {
            setError('Por favor, complete todos los campos.');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3001/usuarios/?username=${credentials.username}&password=${credentials.password}`);
            const data = await response.json();
    
            if (response.ok && data.length > 0) {
                setIsLoggedIn(true);
                navigate('/pokedex', { state: { usuario: credentials.username } });
            } else {
                throw new Error('Usuario no encontrado en la base de datos.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Credenciales inválidas. Inténtalo de nuevo.');
        }
    };
    

    const toggleMostrarPassword = () => {
        setMostrarPassword(!mostrarPassword);
    };

    return (
        <div className="form-container">
            <h2 className='form-title'>¡Inicia sesión!</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={manejoEnvio}>
                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" name="username" value={credentials.username} onChange={manejoCambio} className="form-control" />
                </div>
                <div className="form-group password-input">
                    <label htmlFor="password">Contraseña:</label>
                    <input type={mostrarPassword ? "text" : "password"} id="password" name="password" value={credentials.password} onChange={manejoCambio} className="form-control" />
                    <button type="button" onClick={toggleMostrarPassword} className="toggle-password">
                        {mostrarPassword ? <FaRegEyeSlash className="eye-icon" /> : <FaRegEye className="eye-icon" />}
                    </button>
                </div>
                <button type="submit" className="btn-submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
