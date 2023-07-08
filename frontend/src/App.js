
import './App.css';
import React, { useState,useEffect } from 'react';





const App = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language,setSelectedlang]=useState('')

  const handleConvert = async() => {
    const response = await fetch('http://localhost:6060/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code,language }),
    });

    const data = await response.json();
    console.log(data)
    setOutput(data.response)
  };

  const handleDebug = async() => {
    const response = await fetch('http://localhost:6060/debug', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    setOutput(data.response)
  };

  const handleQualityCheck = async() => {
    const response = await fetch('http://localhost:6060/qualitycheck', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    setOutput(data.response)
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <button href="#convert" onClick={()=>handleConvert()}>Convert</button>
          </li>
          <li>
            <button href="#debug" onClick={()=>handleDebug()}>Debug</button>
          </li>
          <li>
            <button href="#quality-check" onClick={()=>handleQualityCheck()}>Quality Check</button>
          </li>
          <li className="language-dropdown">
            <select onChange={(e)=>setSelectedlang(e.target.value)}>
              <option value="">Select Language</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="go">go</option>
              <option value="c">c</option>
              <option value="c++">c++</option>
              <option value="php">php</option>
              {/* Add more language options */}
            </select>
          </li>
        </ul>
      </nav>
      <div className="content-container">
        <div className="code-section">
          <h2>Code Input</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code here"
            rows={10}
            cols={60}
          />
        </div>
        <div className="response-section">
          <h2>Output</h2>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};


export default App;
