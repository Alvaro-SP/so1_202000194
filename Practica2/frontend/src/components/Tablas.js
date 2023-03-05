
import React, { useState } from "react";
import ParentRow from "./ParentRow";
import ChildRow from "./ChildRow";


// Componente de la tabla completa
const Tablas = ({ datos }) => {
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
    const rows = Object.entries(datos).map(([nombre, { procesoshijos, ...padre }]) => (
        <React.Fragment key={nombre}>
            <ParentRow
                pid={padre.pid}
                nombre={padre.nombre}
                usuario={padre.usuario}
                estado={padre.estado}
                ram={padre.ram}
                children={
                    <tbody>
                        {procesoshijos.map(({ pid, nombre, usuario, estado, ram }) => (
                            <ChildRow pid={pid} nombre={nombre} usuario={usuario} estado={estado} ram={ram} />
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
                    <th> </th>
                    <th> </th>
                    <th>Procesos</th>
                    <th> </th>
                    <th> </th>
                </tr>
                <tr>
                    <th>PID</th>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Estado</th>
                    <th>%RAM</th>
                </tr>
            </thead>
            {rows}
        </table>
    );
};
export default Tablas;