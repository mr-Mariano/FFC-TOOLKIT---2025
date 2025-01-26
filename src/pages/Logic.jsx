import React from 'react';
import TruthTableGenerator from '../components/Logic/TruthTableGenerator';
import Instructions from '../components/Logic/Instructions';
import '../styles/Logic/Logic.css';

const Logic = () => {
    return (
        <>
        <div className='logic-container'>
            <Instructions />
            <div className="text-container">
                <h1>Generador de Tablas de Verdad</h1>
                <p>Primera herramienta, un generador de tablas de verdad. Esta página te permite crear y visualizar tablas de verdad para diversas expresiones lógicas, facilitando el aprendizaje y la comprensión de conceptos fundamentales en lógica y estructuras discretas.</p>
            </div>
        </div>
        <div className='truth-table-container'>
            <TruthTableGenerator />
        </div>
        </>
    );
};

export default Logic;