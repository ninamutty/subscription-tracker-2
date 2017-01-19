import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';

class App extends Component {
  constructor() {
    super();
    this.state = { user: {}, token: '', userID: '' }
    this.handleNewUserSubmit = this.handleNewUserSubmit.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.getUser = this.getUser.bind(this)
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
    console.log("1. In handleLoginSubmit");
    let email = event.target.elements[0].value;
    let password = event.target.elements[1].value;
    let user = {email: email, password: password}
    console.log(user);

    console.log("3. In createUser");
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": user.email,
        "password": user.password,
      })
    }).then( (response) => {
      return response.json();
    }).then( (response) => {
      console.log(response);
      // this.setState({token: response})
      var decoded = jwtDecode(response)
      console.log("4. >>>>>DEcoding");
      console.log(decoded);
      this.setState({userID: decoded.id})
    }).then( () => {
      console.log(this.state.userID);
      this.getUser(this.state.userID)
    }).catch(function(err) {
      console.log(err);
    });
    // send to home page here
    // browserHistory.push(path);
  }

  getUser(userID) {
    console.log("5. userid: " + userID);
    console.log("6. fetch user");
    fetch(`http://localhost:8080/api/users/${userID}`, {
      accept: 'application/json',
    }).then( (response) => {
      return response.json();
    }).then( (response) => {
      console.log("7. set user");
      console.log(response);
      this.setState({user: response.user})
    }).catch(function(err) {
      console.log(err);
    });
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
        <p> {this.state.user._id} </p>
        <p>Token Decode:  {this.state.userID} </p>


      </div>
    );
  }
}

export default App;
