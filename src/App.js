import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './secciones/Inicio';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import About from './secciones/AboutPokemon';
import Registro from './secciones/Registro';
import Login from './secciones/Login';
import Pokedex from './secciones/Pokedex';
import Logout from './secciones/Logout';
import Error404 from './secciones/Error404';
import GameDetails from './secciones/GameDetails';
import PokemonTable from './secciones/PokemonTable';
import CompletedLoginMenu from './secciones/CompletedLoginMenu';
import PokemonDetail from './secciones/PokemonDetail';
import UserProfile from './secciones/UserProfile'; // Nuevo import
import ProtectedRoute from './componentes/ProtectedRoute'; 
import { API_BASE_URL } from './config';
import Foro from './secciones/Foro'; 

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true); // Nuevo estado de carga

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Validar el token con el servidor
            fetch(`${API_BASE_URL}/api/users/validate-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.valid) {
                    setIsLoggedIn(true);
                    setUserId(data.userId);
                } else {
                    setIsLoggedIn(false);
                    localStorage.removeItem('token'); // Eliminar token no válido
                }
            })
            .catch(err => {
                console.error('Error al validar el token:', err);
                setIsLoggedIn(false);
                localStorage.removeItem('token'); // Eliminar token en caso de error
            })
            .finally(() => {
                setLoading(false); // Terminar la carga después de la verificación
            });
        } else {
            setLoading(false); // Terminar la carga si no hay token
        }
    }, []);

    if (loading) {
        return <div>Cargando...</div>; // Puedes reemplazar esto con un spinner o una pantalla de carga
    }

    return (
        <Router>
            <div className='app-container'>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/about" element={<About />} />
                    <Route path='/registrar' element={<Registro />} />
                    <Route path="/foro" element={<Foro />} />
                    <Route path="/login" element={<Login setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><UserProfile userId={userId} setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
                    <Route path="/pokedex" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Pokedex isLoggedIn={isLoggedIn} userId={userId} setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
                    <Route path="/completed-login-menu" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CompletedLoginMenu isLoggedIn={isLoggedIn} userId={userId} setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
                    <Route path="/game/:name" element={<ProtectedRoute isLoggedIn={isLoggedIn}><GameDetails isLoggedIn={isLoggedIn} userId={userId} setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
                    <Route path="/poketable" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PokemonTable isLoggedIn={isLoggedIn} userId={userId} setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
                    <Route path="/pokemon/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PokemonDetail isLoggedIn={isLoggedIn} userId={userId} setIsLoggedIn={setIsLoggedIn} /></ProtectedRoute>} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
