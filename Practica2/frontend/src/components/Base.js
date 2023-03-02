import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Targets.css';

const Base = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [data, setData] = useState([]);
    const handleClick = (value) => {
        setDisplayValue(displayValue === '0' ? value : displayValue + value);
    };
    // const HandleEvaluate33 = () => {
    useEffect(() => {
        axios.get('http://localhost:8080/logsget')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);
    // }
    const LIMPIECITA = () => {
        setDisplayValue('0');
    };
    const handleEvaluate = () => {
        //  displayValue this is my evaluation
        try {
            if (eval(displayValue).toString() === "Infinity") {
                alert("Error: division por cero");
                // return;
            }
        } catch (e) {
            // manejar el error aquí
        }
        //  match es mi lista de valores algo asi: 
        const match = displayValue.match(/^(\-?\d+\.?\d*)\s*([+\-*/])\s*(\-?\d+\.?\d*)$/);
        if (match) {
            // setNumin1(match[1]);
            // setOperator(match[2]);
            // setNumin2(match[3]);
            // alert(match);
        } else {
            alert("Error: Ingrese una expresion valida, Gracias :D");
        }
        let operator2;
        switch (match[2]) {
            case "+":
                operator2 = "suma";
                break;
            case "-":
                operator2 = "resta";
                break;
            case "*":
                operator2 = "multi";
                break;
            case "/":
                operator2 = "divi";
                break;
            default:
                operator2 = "";
                break;
        }

        match[2] = operator2;

        axios.get(`http://localhost:8080/${match[1]}/${match[2]}/${match[3]}`)
            .then(response => {
                console.log(response.data.result.toString());
                setDisplayValue(response.data.result.toString());
                // console.log(resfin);
                axios.get('http://localhost:8080/logsget')
                    .then(res => setData(res.data))
                    .catch(err => console.error(err));
            })
            .catch(error => {
                console.error(error);
            });
    };
    return (
        <div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <div id="grafica1"></div>
                    </div>
                    <div className="col-sm-6">
                        <div id="grafica2"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h1 className="text-center">Resumen General de Procesos</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h1 className="text-center">Resumen General de Procesos</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Proceso 1</h5>
                                <p className="card-text">100</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Proceso 2</h5>
                                <p className="card-text">200</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Proceso 3</h5>
                                <p className="card-text">300</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Proceso 4</h5>
                                <p className="card-text">400</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Proceso más importante</h5>
                                <p className="card-text">5000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="calculator">
                <div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>No.</th>
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
                                    <td>{index + 1}</td>
                                    <td>{row.operator}</td>
                                    <td>{row.num1}</td>
                                    <td>{row.num2}</td>
                                    <td>{row.resultado}</td>
                                    <td>{row.fechayhora}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <button style={{backgroundColor: 'whitesmoke'}}>R</button> */}
                </div>
            </div>


        </div>

    );
};

export default Base;