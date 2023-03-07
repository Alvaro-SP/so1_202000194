import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Targets.css';
import Tablas from './Tablas';
import Navbar from './Navbar';
import Ram from "./Ram";
import Cpu from "./Cpu";
import Footer from './Footer';
const Base = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [data, setData] = useState([]);
    const [treeData, setTreeData] = useState([]);
    // Datos de ejemplo
    const datos = {
        procesopadre1: {
            pid: "123478",
            nombre: "padre1",
            usuario: "user1",
            estado: "activo",
            ram: 50,
            procesoshijos: [
                { pid: 1, nombre: "proceso1", usuario: "user1", estado: "activo", ram: 40 },
                { pid: 2, nombre: "proceso2", usuario: "user2", estado: "inactivo", ram: 20 },
                { pid: 3, nombre: "proceso3", usuario: "user3", estado: "activo", ram: 60 },
            ],
        },
        procesopadre2: {
            pid: "123478",
            nombre: "padre2",
            usuario: "user4",
            estado: "inactivo",
            ram: 30,
            procesoshijos: [
                { pid: 4, nombre: "proceso4", usuario: "user4", estado: "inactivo", ram: 30 },
                { pid: 5, nombre: "proceso5", usuario: "user5", estado: "activo", ram: 50 },
            ],
        },
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
            <Navbar />
            <br />
            <br />
            <br />
            <h1 className="text-center" align="center"> MONITOREO DE RECURSOS</h1>
            <div class="col-sm-6" align="center">
                    <Cpu Crr_Arr={[5, 5, 8, 9, 3, 7, 4, 10]} />
                    <br />
                    <Ram Crr_Arr={[5, 5, 8, 9, 3, 7, 8, 10, 10, 10, 10, 10, 10, 5, 5, 8, 9, 3, 7, 8, 10, 10, 10, 10, 10, 10]} />
                </div>
            <div class="container-fluid">
                
                <div class="row">
                    <div class="col-sm-12">
                        <h1 class="text-center" align="center">Resumen General de Procesos</h1>
                    </div>
                </div>
                <div className="card-container">
                    <div className="card">
                        <h2>1</h2>
                        <p>Procesos en ejecución</p>
                    </div>
                    <div className="card">
                        <h2>1</h2>
                        <p>Procesos suspendidos</p>
                    </div>
                    <div className="card">
                        <h2>2</h2>
                        <p>Procesos detenidos</p>
                    </div>
                    <div className="card">
                        <h2>2</h2>
                        <p>Procesos zombie</p>
                    </div>
                </div>
                <br />
                <div className="card-container">
                    <div className="card">
                        <h2>6</h2>
                        <p>Total de procesos</p>
                    </div>
                </div>
            </div>


            {/* <div className="calculator" align="center">
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
                </div>
            </div> */}
            <br />
            <br />
            <Tablas datos={datos} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>

    );
};

export default Base;