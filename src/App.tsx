import React, {useState} from 'react';
import serverConfiguration from './config/config.js'

function App() {
  const [message, setMessage] = useState(0)
  return (
    <div className="App">
      {message}
      <button onClick={
          ()=>{
              let url:string = serverConfiguration.serverIP
              fetch(url+"/").then(
                  (value)=>{
                      console.log(value)
                      return value.json()
                  }).
              then(
                  (data)=>{
                      setMessage(data)
                  }
              )
          }
      }>
        Click to generate random number
      </button>
    </div>
  );
}

export default App;
