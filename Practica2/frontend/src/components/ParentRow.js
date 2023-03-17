
import React, { useState } from "react";



// Componente para renderizar la fila del padre
const ParentRow = ({ pid, nombre, usuario, estado, ram, children, onExpand }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
        onExpand(nombre);
    };
    const style = {
        border: isExpanded ? "3px solid blue" : "3px solid black",
        backgroundColor: isExpanded ? "lightblue" : "lightgray"
    };

    return (
        <>
            <tr style={style} onClick={handleClick} >
                <td>{pid}</td>
                <td>{nombre}</td>
                <td>{usuario}</td>
                <td>{estado}</td>
                <td>{ram/1000} %</td>
            </tr>
            {isExpanded && children}
        </>
    );
};
export default ParentRow;