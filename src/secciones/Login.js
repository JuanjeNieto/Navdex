import React, { useState } from 'react';
import '../estilos/Registro.css'; // Archivo CSS para estilos
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

// Componente funcional de Login que recibe setIsLoggedIn como prop
const Login = ({ setIsLoggedIn }) => {
    // Estado para almacenar las credenciales del usuario
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    // Hook de navegación para redirigir después del inicio de sesión
    const navigate = useNavigate();

    // Estado para gestionar mensajes de error
    const [error, setError] = useState('');

    // Estado para controlar la visibilidad de la contraseña
    const [mostrarPassword, setMostrarPassword] = useState(false);

    // Función para manejar cambios en los campos de entrada
    const manejoCambio = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Función para manejar el envío del formulario
    const manejoEnvio = async (e) => {
        e.preventDefault();
    
        if (!credentials.username || !credentials.password) {
            setError('Por favor, complete todos los campos.');
            return;
        }
    
        try {
            // Petición para verificar las credenciales del usuario
            const response = await fetch(`http://localhost:3001/usuarios/?username=${credentials.username}&password=${credentials.password}`);
            const data = await response.json();
    
            if (response.ok && data.length > 0) {
                // Si las credenciales son correctas, establecer el estado de inicio de sesión y redirigir
                setIsLoggedIn(true);
                navigate('/pokedex', { state: { usuario: credentials.username } });
            } else {
                // Si las credenciales son incorrectas, mostrar un mensaje de error
                throw new Error('Usuario no encontrado en la base de datos.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Credenciales inválidas. Inténtalo de nuevo.');
        }
    };
    
    // Función para alternar la visibilidad de la contraseña
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
                    {/* Botón para alternar la visibilidad de la contraseña */}
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
