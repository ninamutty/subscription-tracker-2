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
      <div className="main-content verify">
        <h2>Welcome! </h2>
        <h4>With Subscription Tracker, You Can Easily Track All of Your Subscriptions In One Place </h4>

        <div className="forms row">
          <SignUp />

          <Login />
        </div>
      </div>
    );
  }
}

export default Verify;
