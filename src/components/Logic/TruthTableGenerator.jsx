
import React, { useState } from 'react';
import Input from './Input';
import TruthTable from './TruthTable';
import '../../styles/Logic/TruthTables.css';

const TruthTableGenerator = () => {
    const [table, setTable] = useState([]);

    const generateTable = (expression) => {
        // 1. Extraer las variables únicas de la expresión lógica (mayúsculas y minúsculas)
        const variables = Array.from(new Set(expression.match(/[A-Za-z]/g)));

        // 2. Calcular el número de filas necesarias para la tabla de verdad
        const numRows = Math.pow(2, variables.length);

        // 3. Inicializar un array vacío para almacenar las filas de la tabla
        const table = [];

        // 4. Generar todas las combinaciones posibles de valores de verdad para las variables
        for (let i = 0; i < numRows; i++) {
            const row = {};

            // 5. Asignar valores de verdad a cada variable en la fila actual
                /*Explicación:
                    •Máscara: Es el número con un solo bit en 1 en la posición que corresponde a la variable actual.
                        Se genera con 1 << (variables.length - index - 1).
	                •Operación i & (1 << ...): 
                        Aplica la máscara sobre el número i (que es el número de la iteración en binario) 
                        para verificar si el bit está encendido o apagado.
                */
            variables.forEach((variable, index) => {
                row[variable] = Boolean(i & (1 << (variables.length - index - 1)));
            });

            // 6. Evaluar la expresión lógica con los valores de verdad actuales
            row[expression] = evaluateExpression(expression, row);

            // 7. Añadir la fila a la tabla
            table.push(row);
        }

        // 8. Actualizar el estado con la nueva tabla de verdad
        setTable(table);
    };

    const evaluateExpression = (expression, values) => {
        const expr = expression
            .replace(/&/g, '&&')
            .replace(/\|/g, '||')
            .replace(/¬/g, '!')
            .replace(/∧/g, '&&')
            .replace(/∨/g, '||')
            .replace(/~/g, '!')
            .replace(/([A-Za-z])/g, (match) => values[match]);
        
        try {
            return eval(expr);
        } catch (error) {
            console.error('Error al evaluar la expresión:', expr, error);
            return false;
        }
    };

    return (
        <div className='truth-table-generator'>
            <Input onGenerate={generateTable} />
            <TruthTable table={table} />
        </div>
    );
};

export default TruthTableGenerator;