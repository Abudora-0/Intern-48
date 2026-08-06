import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 1. useState to manage current input, result value, and the display state
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [display, setDisplay] = useState('0');

  // 2. useEffect to update the display whenever the input/result state changes
  useEffect(() => {
    if (result !== '') {
      setDisplay(result);
    } else if (input !== '') {
      setDisplay(input);
    } else {
      setDisplay('0');
    }
  }, [input, result]);

  const handleButtonClick = (value) => {
    // If a calculation was just completed, handle the next input appropriately
    if (result !== '') {
      if (['+', '-', '×', '÷'].includes(value)) {
        // Continue calculation with the previous result
        setInput(result + value);
        setResult('');
      } else {
        // Start a completely new calculation
        setInput(value);
        setResult('');
      }
      return;
    }
    
    // Append the clicked button value to the current input
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    if (input === '') return;

    try {
      // Replace display-friendly symbols with JavaScript math operators
      const mathExpression = input.replace(/×/g, '*').replace(/÷/g, '/');
      
      // Evaluate the expression (Using Function to avoid strict eval() warnings)
      // eslint-disable-next-line no-new-func
      const evaluatedResult = new Function('return ' + mathExpression)();

      // Check for division by zero or invalid logic
      if (!isFinite(evaluatedResult) || isNaN(evaluatedResult)) {
        setResult('Error');
      } else {
        // Round slightly to prevent JS floating point precision issues (e.g., 0.1 + 0.2)
        const preciseResult = Math.round(evaluatedResult * 100000000) / 100000000;
        setResult(String(preciseResult));
      }
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        {/* Screen-like box displaying current input or result */}
        <div className="display-screen">
          {display}
        </div>
        
        {/* Standard calculator buttons */}
        <div className="button-grid">
          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
          <button className="operator" onClick={() => handleButtonClick('÷')}>÷</button>

          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
          <button className="operator" onClick={() => handleButtonClick('×')}>×</button>

          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
          <button className="operator" onClick={() => handleButtonClick('-')}>-</button>

          <button className="clear" onClick={handleClear}>C</button>
          <button onClick={() => handleButtonClick('0')}>0</button>
          <button className="equals" onClick={handleCalculate}>=</button>
          <button className="operator" onClick={() => handleButtonClick('+')}>+</button>
        </div>
      </div>
    </div>
  );
}

export default App;