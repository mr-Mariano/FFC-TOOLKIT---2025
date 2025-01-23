import React from 'react';
import '../styles/Header.css';

const Header = () => {
    return (
        <div className='header-container'>
            <div className='header-content'>
                <h1 className='header-title'>Bienvenidos al Proyecto</h1>
                <p className='header-description'>
                  Este proyecto se realiza con el fin de aplicar los conocimientos adquiridos en la materia de Lógica y Estructuras Discretas.
                </p>
                <p className='header-info'>
                  Profesor: [Nombre del Profesor] <br />
                  Materia: Lógica y Estructuras Discretas <br />
                  Semestre: Primavera 2025
                </p>
            </div>
        </div>
    );
};

export default Header;