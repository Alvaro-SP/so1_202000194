
import React, { useState } from "react";
import ParentRow from "./ParentRow";
import ChildRow from "./ChildRow";


// Componente de la tabla completa
const Tablas = ({datos}) => {
    const [expanded, setExpanded] = useState([]);

    // Función para manejar la expansión de filas
    const handleExpand = (nombre) => {
        if (expanded.includes(nombre)) {
            setExpanded(expanded.filter((item) => item !== nombre));
        } else {
            setExpanded([...expanded, nombre]);
        }
    };
    // Renderización de filas y columnas
    const rows = Object.entries(datos).map(([nombre, hijos]) => (
        <React.Fragment key={nombre}>
            <ParentRow
                nombre={nombre}
                children={
                    <tbody>
                        {hijos.map(({ nombre, id }) => (
                            <ChildRow key={id} nombre={nombre} />
                        ))}
                    </tbody>
                }
                onExpand={handleExpand}
            />
        </React.Fragment>
    ));

    return (
        <table>
            <thead>
                <tr>
                    <th>Proceso</th>
                </tr>
            </thead>
            {rows}
        </table>
    );
};
export default Tablas;