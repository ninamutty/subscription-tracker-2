import React, { Component } from 'react';
import Login from './Login';
import SignUp from './SignUp';

class Verify extends Component {
  constructor() {
    super();
    this.state = { user: {}, token: '', userID: '' }
  }

  render() {
    return (
      <div className="main-content Verify">

        <h3>Please Sign Up to Begin</h3>
        <SignUp />

        <p>Already have an account? Please Login to Continue </p>
        <Login />
      </div>
    );
  }
}

export default Verify;
