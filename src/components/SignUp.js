import React, { Component } from 'react';
import { browserHistory } from 'react-router';

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
    }).then(
      browserHistory.push(`home/${this.state.user.id}`)
    ).catch(function(err) {
      console.log(err);
    });

    // send to home page here
  }

  render() {
    return (
      <div className="sign-up-form-container">
        <form onSubmit={this.handleNewUserSubmit}>
          <input type="text" placeholder="Name"/>
          <input type="text" placeholder="Email"/>
          <input type="text" placeholder="Password"/>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
