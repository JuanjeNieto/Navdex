import React, { useState } from 'react';
import Inicio from './secciones/Inicio';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PokemonDetail from './secciones/PokemonDetail';

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

const LOGIN_URL = "/login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    
    return (
        <Router>
            <div className='app-container'>
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Routes>

                    <Route path="/" element={<Inicio />} />
                    <Route path="/about" element={<About />} />
                    <Route path='/registrar' element={<Registro />} />
                    <Route path="/login" element={<Login setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} />} />
                    
                    <Route path="/pokedex" element={isLoggedIn ? <Pokedex isLoggedIn={isLoggedIn} userId={userId} setIsLoggedIn={setIsLoggedIn} /> : <Navigate to={LOGIN_URL} />} />

                    <Route path="/game/:name" element={<GameDetails />} />
                    <Route path="/poketable" element={<PokemonTable/>}/>
                    <Route path="/pokemon/:id" element={<PokemonDetail />} />

                    <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="*" element={<Error404 />} />
                    
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
