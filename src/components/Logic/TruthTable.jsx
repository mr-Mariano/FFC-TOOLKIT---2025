import React from 'react';

const TruthTable = ({ table }) => {
    if (!table || table.length === 0) return null;
    /*
    Ejemplo de tabla de verdad:
        const table = [
            { P: true, Q: false, "P & Q": false },
            { P: true, Q: true, "P & Q": true },
            { P: false, Q: false, "P & Q": false },
            { P: false, Q: true, "P & Q": false }
];
    */

    const headers = Object.keys(table[0]);
    // En este caso, headers será ["P", "Q", "P & Q"].

    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {table.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header) => (
                            <td key={`${index}-${header}`}>{row[header] ? 'T' : 'F'}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TruthTable;