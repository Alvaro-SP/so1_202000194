import React, { useState, useEffect } from 'react';

const DataTable = () => {
    const [data, setData] = useState([]);

    // useEffect(() => {
    // const fetchData = async () => {
    //     const result = await fetch('https://your-api-url.com/data');
    //     const data = await result.json();
    //     setData(data);
    // };
    // fetchData();
    // }, []);
    // useEffect(() => {
    //     axios.get('/data')
    //     .then(res => setData(res.data))
    //     .catch(err => console.error(err));
    // }, []);

    return (
    <table className="data-table">
        <thead>
        <tr>
            <th>Operación</th>
            <th>Número 1</th>
            <th>Número 2</th>
            <th>Resultado</th>
            <th>Fecha y hora</th>
        </tr>
        </thead>
        <tbody>
        {data.map((row, index) => (
            <tr key={index}>
            <td>{row.operation}</td>
            <td>{row.number1.join(', ')}</td>
            <td>{row.number2.join(', ')}</td>
            <td>{row.result}</td>
            <td>{row.date}</td>
            </tr>
        ))}
        </tbody>
    </table>
    );
};

export default DataTable;