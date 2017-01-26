import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import InputPassword from 'react-ux-password-field';

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

    const BASE_URL = 'http://custom-env.rfpftqwtew.us-east-1.elasticbeanstalk.com/'

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
      browserHistory.push(`home/${userID}/dashboard`)
    }).catch(function(err) {
      console.log(err);
    });

  }


  render() {
    return (
      <div className="login-form-container column small-12 medium-6 large-6">
        <h4>Already have an account? Please <span className="verify-bold">Login</span> to Continue </h4>
        <form onSubmit={this.handleLoginSubmit} className="login-form">
          <input type="text" placeholder="Email"/>
          <InputPassword placeholder="Password" infoBar={false} zxcvbn={false} />
          <button type="submit" className="button hollow success">Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
