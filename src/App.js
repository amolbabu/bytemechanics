import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  Vote from './Vote.js';
import Ask from './Ask.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <label className="App-logo" alt="logo">NAO</label>
          Create your Questions!

          <Ask/>
        </header>
      </div>
    );
  }
}

export default App;
