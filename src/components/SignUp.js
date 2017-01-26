import React, { Component } from 'react';
import { hashHistory } from 'react-router';
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

    const BASE_URL = 'http://custom-env.rfpftqwtew.us-east-1.elasticbeanstalk.com/'

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
      let path = `/subscription-tracker-2/home/${this.state.user._id}/dashboard`
      hashHistory.push(path);
    }).catch(function(err) {
      console.log(err);
    });
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
