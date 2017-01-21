import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

class Login extends Component {
  constructor() {
    super();
    this.state = { user: {}, userID: '' }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }

  // send post request to login a user
  handleLoginSubmit(event) {
    event.preventDefault();
    let email = event.target.elements[0].value;
    let password = event.target.elements[1].value;
    let user = {email: email, password: password}

    const BASE_URL = 'http://localhost:8080/'

    fetch(`${BASE_URL}login`, {
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
      var decoded = jwtDecode(response)
      this.setState({userID: decoded.id})
    }).then( () => {
      let userID = this.state.userID
      browserHistory.push(`/home/${userID}/dashboard`)
    }).catch(function(err) {
      console.log(err);
    });

  }


  render() {
    return (
      <div className="login-form-container column small-12 medium-6 large-6">
        <h3>Already have an account? Please Login to Continue </h3>
        <form onSubmit={this.handleLoginSubmit}>
          <input type="text" placeholder="Email"/>
          <input type="text" placeholder="Password"/>
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
