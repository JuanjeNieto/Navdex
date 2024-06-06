import React from 'react';
import '../estilos/about.css';
import reactLogo from '../images/react-logo.png';
import nodeLogo from '../images/node-logo.png';
import expressLogo from '../images/express.png';

const About = () => {
    return (
        <div className="about-container">
            <h1>Acerca de mi TFG de DAW</h1>
            <p>Este proyecto es mi Trabajo de Fin de Grado (TFG) en Desarrollo de Aplicaciones Web (DAW). En él, he desarrollado una aplicación web utilizando diversas tecnologías modernas para ofrecer una solución robusta y eficiente.</p>
            
            <div className="section">
                <h2>Tecnologías Utilizadas</h2>
                <ul>
                    <li>
                        <img src={reactLogo} alt="React" className="tech-logo" /> React: Una biblioteca de JavaScript para construir interfaces de usuario.
                    </li>
                    <li>
                        <img src={nodeLogo} alt="Node.js" className="tech-logo" /> Node.js: Un entorno de ejecución para JavaScript en el servidor.
                    </li>
                </ul>
            </div>
            
            <div className="section">
                <h2>Características del Proyecto</h2>
                <p>La aplicación incluye varias características destacadas, como la autenticación de usuarios, la gestión de datos en tiempo real y una interfaz de usuario dinámica y responsiva.</p>
            </div>
            
            <div className="section">
                <h2>Objetivos</h2>
                <p>El objetivo principal de este TFG es demostrar mis habilidades en el desarrollo de aplicaciones web, desde el diseño y la implementación hasta la prueba y el despliegue de la aplicación.</p>
            </div>
        </div>
    );
};

export default About;
