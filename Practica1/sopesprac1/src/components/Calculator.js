import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [data, setData] = useState([]);
    const handleClick = (value) => {
        setDisplayValue(displayValue === '0' ? value : displayValue + value);
    };
    const handleEvaluate33 = () => {
        useEffect(() => {
        axios.get('http://localhost:8080/logsget')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);
    }
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
        <div className="calculator">
            <input type="text" value={displayValue} readOnly  style={{backgroundColor: 'black', color: 'white'}} />
            <br />
            <br />
            <button onClick={LIMPIECITA} style={{backgroundColor: 'green', width: '160px'}}>Clear</button>
            {/* <button onClick={() => handleClick('')}></button> */}
            <button onClick={() => handleClick('/')}  style={{backgroundColor: 'green'}}>/</button>
            <button onClick={() => handleClick('*')}  style={{backgroundColor: 'green'}}>x</button>
            <br />
            <button onClick={() => handleClick('7')} style={{backgroundColor: 'blue' , color: 'white'}}>7</button>
            <button onClick={() => handleClick('8')} style={{backgroundColor: 'blue' , color: 'white'}}>8</button>
            <button onClick={() => handleClick('9')} style={{backgroundColor: 'blue' , color: 'white'}}>9</button>
            <button onClick={() => handleClick('-')} style={{backgroundColor: 'green'}}>-</button>
            <br />
            <button onClick={() => handleClick('4')} style={{backgroundColor: 'blue' , color: 'white'}}>4</button>
            <button onClick={() => handleClick('5')} style={{backgroundColor: 'blue' , color: 'white'}}>5</button>
            <button onClick={() => handleClick('6')} style={{backgroundColor: 'blue' , color: 'white'}}>6</button>
            <button onClick={() => handleClick('+')}  style={{backgroundColor: 'green'}}>+</button>
            <br />
            <button onClick={() => handleClick('1')} style={{backgroundColor: 'blue' , color: 'white'}}>1</button>
            <button onClick={() => handleClick('2')} style={{backgroundColor: 'blue' , color: 'white'}}>2</button>
            <button onClick={() => handleClick('3')} style={{backgroundColor: 'blue' , color: 'white'}}>3</button>
            <br />
            <button onClick={() => handleClick('.')} style={{backgroundColor: 'blue' , color: 'white'}}>.</button>
            <button onClick={() => handleClick('0')} style={{backgroundColor: 'blue' , color: 'white'}}>0</button>
            <button onClick={handleEvaluate} style={{backgroundColor: 'red'}}>=</button>
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
        <button onClick={handleEvaluate33} style={{backgroundColor: 'whitesmoke'}}>R</button>
        </div>
    </div>
    
    );
};

export default Calculator;