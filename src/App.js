import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="main-content App">
        <header className="header">
          <h1 className="header-title"> Enrolled Regulars </h1>
        </header>
        { this.props.children }
      </div>
    );
  }
}

export default App;
