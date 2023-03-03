
import React, { useState } from "react";



// Componente para renderizar la fila del padre
const ParentRow = ({ nombre, children, onExpand }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
        onExpand(nombre);
    };

    return (
        <>
            <tr onClick={handleClick}>
                <td>{nombre}</td>
            </tr>
            {isExpanded && children}
        </>
    );
};
export default ParentRow;