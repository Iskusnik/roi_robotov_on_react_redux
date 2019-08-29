import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './components/board';
import CodeBoard from './components/board'

const App = () => (
    <div className="row mt-5">
      <div className="col-md-4 offset-md-1">
        <h2>Board 1</h2>
          <GameBoard/>
          <h2>Board 2</h2>
          <CodeBoard/>
      </div>
    </div>
);

/*
<Board />
function App() {
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
      </header>
    </div>
  );
}*/

export default App;
