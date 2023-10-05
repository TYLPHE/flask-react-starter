import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    async function testConnection() {
      const req = await fetch('/test');
      const res = await req.json(req);
      console.log(res);
      return;
    }
    testConnection();
  });
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a href='/test'>Test</a>
      </header>
    </div>
  );
}

export default App;
