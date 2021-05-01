import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import FirstComponent from './Components/SampleLearningComponents/FirstComponent'
import SecondComponent from './Components/SampleLearningComponents/SecondComponent'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
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
      </header> */}
      My Hello World
      <FirstComponent/>
      <SecondComponent/>
    </div>
  );
}



export default App;
