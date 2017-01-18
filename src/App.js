import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';

class App extends Component {
  state = {
    user: {},
  }

  parseJSON = (response) => {
    return response.json();
  }

  handleNewUserSubmit(event) {
    event.preventDefault();
    console.log("In handleSubmit");

    let name = event.target.elements[0].value;
    let email = event.target.elements[1].value;
    let password = event.target.elements[2].value;
    let user = {name: name, email: email, password: password}
    console.log(user);

    console.log("In createUser");
    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      })
    }).then( (response) => {
      return response.json();
    }).then( (response) => {
      this.setState({user: response.user})
    }).catch(function(err) {
      console.log(err);
    });
    // send to home page here
    // browserHistory.push(path);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    console.log("In handleLoginSubmit");
    let email = event.target.elements[0].value;
    let password = event.target.elements[1].value;
    let user = {email: email, password: password}
    console.log(user);

    console.log("In createUser");
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      })
    }).then( (response) => {
      return response.json();
    }).then( (response) => {
      this.setState({user: response.user})
    }).catch(function(err) {
      console.log(err);
    });
    // send to home page here
    // browserHistory.push(path);
  }



  render() {
    return (
      <div className="main-content App">
        <h2>Welcome to Subscription Tracker! </h2>
        <p>Track all of your subscriptions in one place to more easily manage your spending! </p>

        <h3>Please Sign Up to Begin</h3>
        <form onSubmit={this.handleNewUserSubmit}>
          <input type="text" placeholder="Name"/>
          <input type="text" placeholder="Email"/>
          <input type="text" placeholder="Password"/>
          <button type="submit">Sign Up</button>
        </form>

        <p>Already have an account? Please Login to Continue </p>
        <form onSubmit={this.handleLoginSubmit}>
          <input type="text" placeholder="Email"/>
          <input type="text" placeholder="Password"/>
          <button type="submit">Log In</button>
        </form>

        <h2> Hello, {this.state.user.name}</h2>

      </div>
    );
  }
}

export default App;
