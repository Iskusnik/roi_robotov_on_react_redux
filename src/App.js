import React from 'react';
import logo from './logo.svg';
import './App.css';
import CodeBoard from './components/codeBoard'
import CodeButton from './components/codeButton'
import CodeButtonsMenu from './components/codeButtonsMenu'
import GameButtonsMenu from './components/gameButtonsMenu'
import GameBoard from "./components/gameBoard";

const App = () => (
    <div className="row mt-5">
        <div className="col-md-4 offset-md-1">

            <GameButtonsMenu/>
            <div className="flex-container-menu">

                <div style={{overflow: 'auto', height:'100%', width:'100%', backgroundColor:'white', margin: '1 auto'}}>
                    <GameBoard/>
                </div>
                <div style={{overflow: 'auto', height:'100%', width:'100%', backgroundColor:'white', margin: '1 auto'}}>
                    <CodeButtonsMenu />
                </div>
            </div>

            <h2></h2>
            <CodeBoard/>
        </div>
    </div>
);

/*
<div className="container">
                <div className="flex-container">

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
