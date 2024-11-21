import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import { UsedValueState } from 'ajv/dist/compile/codegen/scope';

function App() {
  const [ws, setWs] = useState(null);
  const [ledStatus, setLedStatus] = useState(false);

  useEffect(()=>{
    const socket = new WebSocket('http://192.168.43.73:8080');

    socket.open = () => {
        console.log("conectado al servidor");
        setWs(socket);
    }
  })

  const toggleLed = () =>{
    if(ws){
      const newStatus = ledStatus ? 'OFF': 'ON';
      //ws.send(newStatus);
      ledStatus ? setLedStatus(false): setLedStatus(true);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Control de Leds</h1>
      </header>
      <main>
        <div className='widget' >
          <p>
            El led esta: {ledStatus}
          </p>
          <div className='toggle' >
            <input  type='checkbox' id='green'  onClick={toggleLed}  checked={ledStatus}/>
            <label for='green' ></label>   
            <p>{ws}</p>
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
