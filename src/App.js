import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="main-content App">
        <header>
          <h1>Welcome to Subscription Tracker! </h1>
          <p>Track all of your subscriptions in one place to more easily manage your spending! </p>
        </header>
        { this.props.children }
      </div>
    );
  }
}

export default App;
