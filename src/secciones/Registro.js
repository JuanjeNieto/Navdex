import React, { useState } from 'react';
import '../estilos/Registro.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import profImage from '../images/prof.jpg';

const Registro = () => {
    const [datos, setDatos] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [mensajeOk, setMensajeOk] = useState('');
    const [error, setError] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);

    // Hook de navegación para redirigir después del inicio de sesión
    const navigate = useNavigate();

    const manejoCambio = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const manejoEnvio = async (e) => {
        e.preventDefault();

        if (!datos.name || !datos.email || !datos.password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        // Registrar el usuario
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: datos.name,
                    email: datos.email,
                    password: datos.password
                })
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Usuario registrado correctamente:', responseData);
                setMensajeOk('Fue registrado con éxito.');
                setDatos({
                    name: '',
                    email: '',
                    password: ''
                });
                navigate('/login');
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            setError('Error al registrar usuario');
        }
    };

    const toggleMostrarPassword = () => {
        setMostrarPassword(!mostrarPassword);
    };

    return (
        <div className="form-container">
            <h2 className='form-title'>Regístrate!</h2>
            {mensajeOk && <p className="success-message">{mensajeOk}</p>}
            {error && <p className="error-message">{error}</p>}
            
            <form onSubmit={manejoEnvio}>
                <div className="form-group">
                    <img src={profImage} alt="professor" className="prof-image" />
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" value={datos.name} onChange={manejoCambio} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" value={datos.email} onChange={manejoCambio} className="form-control" />
                </div>
                <div className="form-group password-input">
                    <label htmlFor="password">Contraseña:</label>
                    <input type={mostrarPassword ? "text" : "password"} id="password" name="password" value={datos.password} onChange={manejoCambio} className="form-control" />
                    <button type="button" onClick={toggleMostrarPassword} className="toggle-password">
                        {mostrarPassword ? <FaRegEyeSlash className="eye-icon" /> : <FaRegEye className="eye-icon" />}
                    </button>
                </div>
                <button type="submit" className="btn-submit">Registrar</button>
            </form>
        </div>
    );
};

export default Registro;
