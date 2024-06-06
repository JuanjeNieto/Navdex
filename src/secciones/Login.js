import React, { useState } from 'react';
import '../estilos/Registro.css'; // Archivo CSS para estilos
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config'; 

const Login = ({ setIsLoggedIn, setUserId }) => {
    const [credentials, setCredentials] = useState({
        name: '',
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

        if (!credentials.name || !credentials.password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const responseData = await response.json();
                // Guardar el token en el almacenamiento local del navegador
                localStorage.setItem('token', responseData.token);
                setIsLoggedIn(true);
                setUserId(responseData.userId);
                navigate('/completed-login-menu', { state: { usuario: credentials.name } });
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Credenciales inválidas. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error en la conexión. Inténtalo de nuevo.');
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
                    <label htmlFor="name">Usuario:</label>
                    <input type="text" id="name" name="name" value={credentials.name} onChange={manejoCambio} className="form-control" />
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
