import React, { useState } from 'react';
import Inicio from './secciones/Inicio';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import About from './secciones/AboutPokemon';
import Registro from './secciones/Registro';
import Login from './secciones/Login';
import Pokedex from './secciones/Pokedex';

function App() {


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    return (
      
        <Router>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/about" element={<About />} />
                    <Route path='/registrar' element={<Registro/>}/>
                    <Route path="/login" element={<Login setUserId={setUserId} setIsLoggedIn={setIsLoggedIn}/>} />
                    <Route path="/pokedex" element={<Pokedex isLoggedIn={isLoggedIn} userId={userId} setIsLoggedIn={setIsLoggedIn}/>} />
                
                    
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
