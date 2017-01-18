import React, { Component } from 'react';
import './App.css';
import User from './components/User'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to The Tracker</h1>
        <User />
      </div>
    );
  }
}

export default App;
