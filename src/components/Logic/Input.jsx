import React, { useState } from 'react';


const Input = ({ onGenerate }) => {
    const [expression, setExpression] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(expression);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                placeholder="Escribe tu expresión lógica aquí"
            />
            <button type="submit">Generar Tabla de Verdad</button>
        </form>
    );
};

export default Input;