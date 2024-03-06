import React, { useState } from 'react';
import "./style.css"

const Calculator = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const reset = () => {
    setInputValue('');
    setResult('');
  }

  const backspace = () => {
    setInputValue(inputValue.slice(0, -1))
  };

  const handleBrackets = (inputValue) => {
    let bracketStart = inputValue.indexOf("(");
    let bracketEnd = inputValue.indexOf(")");
    while (bracketStart !== -1 && bracketEnd !== -1) {
      let subValue = inputValue.slice(bracketStart + 1, bracketEnd);
      subValue = evaluateInputValue(subValue);
      inputValue = inputValue.slice(0, bracketStart) + subValue + inputValue.slice(bracketEnd + 1);
      bracketStart = inputValue.indexOf("(");
      bracketEnd = inputValue.indexOf(")");
    }
    return inputValue;
  }

  const evaluateInputValue = (inputValue) => {
    let subValue = "";
    let numbers = inputValue.split(/[+\-*/]/);
    let operators = inputValue.split(/[\d]+/).join("").split("");
    let i;
    for (i = 0; i < operators.length; i++) {
      if (operators[i] === "*") {
        subValue = numbers[i] * numbers[i + 1];
        numbers.splice(i, 2, subValue);
        operators.splice(i, 1);
        i--;
      }
      else if (operators[i] === "/") {
        subValue = numbers[i] / numbers[i + 1];
        numbers.splice(i, 2, subValue);
        operators.splice(i, 1);
        i--;
      }
    }
    subValue = parseFloat(numbers[0]);
    for (i = 0; i < operators.length; i++) {
      if (operators[i] === "+") {
        subValue += parseFloat(numbers[i + 1]);
      } else if (operators[i] === "-") {
        subValue -= parseFloat(numbers[i + 1]);
      }
    }
    return subValue;
  }

  const calculate = () => {
    try {
    let finalValue = handleBrackets(inputValue);
    finalValue = evaluateInputValue(finalValue);
    setResult(finalValue);
    } catch(err) {
      setResult("Error");
    }
  }

  const  onClick = button => {
    if(button === "=") {
      calculate();
    }

    else if(button === "C") {
      reset();
    }

    else if(button === "CE") {
      backspace();
    }

    else {
      setInputValue(inputValue + button)
    }
};

  return (
    <div className="container">
      <input className= "input-style" type="text" value={inputValue ? inputValue : "Enter number"} readOnly />
      <input className= "input-style" type="text" value={result ? result : 0} readOnly />
      <br />
      <button value="C" onClick={e => onClick(e.target.value)}>C</button>
      <button value="(" onClick={e => onClick(e.target.value)}>(</button>
      <button value=")" onClick={e => onClick(e.target.value)}>)</button>
      <button value="/" onClick={e => onClick(e.target.value)}>/</button>    
      <br />
      <button value="7" onClick={e => onClick(e.target.value)}>7</button>
      <button value="8" onClick={e => onClick(e.target.value)}>8</button>
      <button value="9" onClick={e => onClick(e.target.value)}>9</button>
      <button value="*" onClick={e => onClick(e.target.value)}>x</button>
      <br />
      <button value="4" onClick={e => onClick(e.target.value)}>4</button>
      <button value="5" onClick={e => onClick(e.target.value)}>5</button>
      <button value="6" onClick={e => onClick(e.target.value)}>6</button>
      <button value="-" onClick={e => onClick(e.target.value)}>-</button>
      <br />
      <button value="1" onClick={e => onClick(e.target.value)}>1</button>
      <button value="2" onClick={e => onClick(e.target.value)}>2</button>
      <button value="3" onClick={e => onClick(e.target.value)}>3</button>
      <button value="+" onClick={e => onClick(e.target.value)}>+</button>
      <br /> 
      <button value="0" onClick={e => onClick(e.target.value)}>0</button>
      <button value="CE" onClick={e => onClick(e.target.value)}>CE</button>
      <button className='equal-button' value="=" onClick={e => onClick(e.target.value)}>=</button>
    </div>
    )
}
export default Calculator;