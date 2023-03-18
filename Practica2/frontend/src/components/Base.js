import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Targets.css';
import Tablas from './Tablas';
import Navbar from './Navbar';
import Reports from "./Reports";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import Ram from "./Ram";
// import Cpu from "./Cpu";

import Footer from './Footer';
const Base = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [data, setData] = useState([]);
    const [listCPU, setListCPU] = useState([]);
    const [listRAM, setListRAM] = useState([]);
    const [option, setOption] = useState(0);
    const [RAMINT, setRAMINT] = useState(0);
    const [CPUINT, setCPUINT] = useState(0);
    const [ejecucion, setEjecucion] = useState(0);
    const [suspendidos, setSuspendidos] = useState(0);
    const [detenidos, setDetenidos] = useState(0);
    const [zombies, setZombies] = useState(0);
    const [total, setTotal] = useState(0);

    // Datos de ejemplo
    const data1 = {
        "0_systemd": {
            "estado": "1",
            "nombre": "systemd",
            "pid": 1,
            "procesoshijos": [],
            "ram": 2993,
            "usuario": "x"
        },
        "100_colord": {
            "estado": "1",
            "nombre": "colord",
            "pid": 1758,
            "procesoshijos": [],
            "ram": 3202,
            "usuario": "x"
        }
    };
    // const HandleEvaluate33 = () => {
    useEffect(() => {
        const fetchData = () => {
        axios.get('http://34.125.9.254:5000/')
            .then(res =>
                {
                    setData(JSON.parse(res.data.cpu_process))
                    // Dividir cada elemento entre 100
                    const cpu_json = JSON.parse(res.data.cpu_json);
                    for (let i = 0; i < cpu_json.length; i++) {
                        cpu_json[i] = cpu_json[i] / 1000;
                    }
                    setListCPU(cpu_json)
                    console.log(JSON.parse(res.data.cpu_process))
                    // Obtener la lista ram_json
                    const ram_json = JSON.parse(res.data.ram_json);

                    // Dividir cada elemento entre 100
                    for (let i = 0; i < ram_json.length; i++) {
                    ram_json[i] = ram_json[i]/100 ;
                    }

                    // Establecer la lista actualizada en setListRAM
                    console.log(ram_json)
                    setListRAM(ram_json);

                    // console.log(res.data)
                    setCPUINT(res.data.percent_cpu/1000)
                    setRAMINT(res.data.percent_ram/100)
                    setEjecucion(res.data.ejecucion)
                    setSuspendidos(res.data.suspendido)
                    setDetenidos(res.data.detenido)
                    setZombies(res.data.zombie)
                    setTotal(res.data.totales)
                } )
            .catch(err => console.error(err));
        };
        fetchData(); // ejecutar la primera vez

        const intervalId = setInterval(fetchData, 1000); // ejecutar cada segundo
        return () => clearInterval(intervalId);
    }, []);
    // }
    const handleClick0 = () => {
        setOption(0);
    };
    const handleClick1 = () => {
        setOption(1);
    };
    return (
        <div>
            <Navbar />
            <br />
            <br />
            <br />
            <h1 className="text-center" align="center" onClick={handleClick1}> MONITOREO DE RECURSOS</h1>
            {/* <div class="col-sm-6" align="center"> */}
            
            <div align="center">
                <Reports
                Crr_Arr1={listRAM}
                Crr_Arr2={ listCPU}
                option={option}
                handleClick0={handleClick0}
                />


            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{paddingLeft:"160px", width: "300px", height: "300px" }}>
                    <CircularProgressbar value={CPUINT} text={`cpu:  ${CPUINT}%`} 
                    styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: 'butt',
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(173, 0, 0, ${(CPUINT/100 )+0.4})`,
                        textColor: '#b04654',
                        trailColor: '#b2ffff',
                        backgroundColor: '#f7f7ff',
                    })}/>;
                </div>
                <div style={{ paddingRight:"270px",width: "300px", height: "300px" }}>
                    <CircularProgressbar value={RAMINT} text={`ram: ${RAMINT}%`} 
                    styles={buildStyles({
                        rotation: 0.25,
                        strokeLinecap: 'butt',
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                        pathColor: `rgba(0, 19, 7, ${(RAMINT/100 )+0.3})`,
                        textColor: '#03C04A',
                        trailColor: '#b2ffff',
                        backgroundColor: '#f7f7ff',
                    })}/>;
                </div>
                
            </div>
            <div class="container-fluid">
                
                <div class="row">
                    <div class="col-sm-12">
                        <h1 class="text-center" align="center">Resumen General de Procesos</h1>
                        
                    </div>
                </div>
                <div className="card-container">
                    <div className="card">
                        <h2>{ejecucion}</h2>
                        <p>Procesos en ejecución</p>
                    </div>
                    <div className="card">
                        <h2>{suspendidos}</h2>
                        <p>Procesos suspendidos</p>
                    </div>
                    <div className="card">
                        <h2>{detenidos}</h2>
                        <p>Procesos detenidos</p>
                    </div>
                    <div className="card">
                        <h2>{zombies}</h2>
                        <p>Procesos zombie</p>
                    </div>
                </div>
                <br />
                <div className="card-container">
                    <div className="card">
                        <h2>{total}</h2>
                        <p>Total de procesos</p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <Tablas datos={data} />
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

