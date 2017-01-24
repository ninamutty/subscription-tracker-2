import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import InputPassword from 'react-ux-password-field';


class SignUp extends Component {
  constructor() {
    super();
    this.state = { user: {} }
    this.handleNewUserSubmit = this.handleNewUserSubmit.bind(this)
  }

  handleNewUserSubmit(event) {
    event.preventDefault();

    let name = event.target.elements[0].value;
    let email = event.target.elements[1].value;
    let password = event.target.elements[2].value;
    console.log(password);
    let user = {name: name, email: email, password: password}

    const BASE_URL = 'http://localhost:8080/'

    fetch(`${BASE_URL}api/users`, {
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
    }).then( () => {
      let path = `/home/${this.state.user.id}/dashboard`
      browserHistory.push(path);
    }).catch(function(err) {
      console.log(err);
    });

    // send to home page here
  }

  render() {
    return (
      <div className="signup-form-container column small-12 medium-6 large-6">
        <h4>Please <span className="verify-bold">Sign Up</span> to Begin</h4>
        <form onSubmit={this.handleNewUserSubmit} className="signup-form">
          <input type="text" placeholder="Name"/>
          <input type="text" placeholder="Email"/>
          <InputPassword placeholder="Password" />
          <button type="submit" className="button hollow success">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;


// <input type="text" placeholder="Password"/>
