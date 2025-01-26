import React from 'react';

const Instructions = () => {
    return (
        <div className="card-instructions">
            <h2>Instrucciones</h2>
            <p>Para escribir una expresión lógica, usa las siguientes reglas:</p>
            <ul>
                <li>Variables: A, B, C, etc.</li>
                <li>AND: & o ∧</li>
                <li>OR: | o ∨</li>
                <li>NOT: ! o ¬ o ~</li>
                <li>Paréntesis para agrupar: ( )</li>
            </ul>
            <p>Ejemplo: ~(A ∧ B) ∨ C</p>
        </div>
    );
};

export default Instructions;