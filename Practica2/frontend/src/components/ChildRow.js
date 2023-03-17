
import React from "react";



// Componente para renderizar la fila del hijo
const ChildRow = ({ pid, nombre, usuario, estado, ram }) => (
    <tr>
        <td>{pid}</td>
        <td>{nombre}</td>
        <td>{usuario}</td>
        <td>{estado}</td>
        <td>{ram/1000}%</td>
    </tr>
);
export default ChildRow;