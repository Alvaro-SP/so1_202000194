import React, { useState } from 'react';

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [numin1, setNumin1] = useState('');
    const [operator, setOperator] = useState('');
    const [numin2, setNumin2] = useState('');

    const handleClick = (value) => {
        setDisplayValue(displayValue === '0' ? value : displayValue + value);
    };

    const LIMPIECITA = () => {
        setDisplayValue('0');
    };

    const handleEvaluate = () => {
        //  displayValue this is my evaluation
        if (eval(displayValue).toString() === "Infinity") {
            alert("Error: division por cero");
            return;
        }
        //  match es mi lista de valores algo asi: 
        const match = displayValue.match(/^(\d+)\s*([+\-*/])\s*(\d+)$/);
        console.log(match);
        if (match) {
            setNumin1(match[1]);
            setOperator(match[2]);
            setNumin2(match[3]);
        } else {
            alert("Error: Ingrese una expresion valida, Gracias :D");
        }
        fetch('API_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                num1: numin1,
                operator: operator,
                num2: numin2,
                result: eval(displayValue).toString()
            })
        })
        .then((response) => {
            console.log(response);
            setDisplayValue(response);
        })
        .catch((error) => {
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
    </div>
    );
};

export default Calculator;