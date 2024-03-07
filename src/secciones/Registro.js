import React, { useState } from 'react';
import '../estilos/Registro.css'; // Archivo CSS para estilos
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import profImage from '../images/prof.jpg'; // Importa la imagen
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const [datos, setDatos] = useState({
        id: 1,
        username: '',
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

        if (!datos.username || !datos.password) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        // Verificar si el nombre de usuario ya existe
        try {
            const response = await fetch(`http://localhost:3001/usuarios?username=${datos.username}`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setError('El nombre de usuario ya está en uso.');
                    return;
                }
            } else {
                throw new Error('Error al verificar el nombre de usuario.');
            }
        } catch (error) {
            console.error('Error al verificar el nombre de usuario:', error);
            return;
        }

        // Generar una ID única
        const newId = generateUniqueId();

        try {
            const response = await fetch('http://localhost:3001/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...datos, id: newId })
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Fue registrado correctamente:', responseData);
                setMensajeOk('Fue registrado con éxito.');
                setDatos({
                    id: newId + 1,
                    username: '',
                    password: ''
                });
                navigate('/login');
                setError('');
            } else {
                throw new Error('Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const toggleMostrarPassword = () => {
        setMostrarPassword(!mostrarPassword);
    };

    const generateUniqueId = () => {
        // Generar una ID única (puedes implementar tu lógica de generación de ID aquí)
        return Math.floor(Math.random() * 1000000);
    };

    return (
        <div className="form-container">
            <h2 className='form-title'>Regístrate!</h2>
            {mensajeOk && <p className="success-message">{mensajeOk}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={manejoEnvio}>
                <div className="form-group">
                    <img src={profImage} alt="professor" className="prof-image" /> {/* Inserta la imagen */}
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" name="username" value={datos.username} onChange={manejoCambio} className="form-control" />
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
