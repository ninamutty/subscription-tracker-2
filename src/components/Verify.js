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
        <h1>Welcome to Subscription Tracker! </h1>
        <p>Track all of your subscriptions in one place to more easily manage your spending! </p>

        <div className="forms row">
          <SignUp />

          <Login />
        </div>
      </div>
    );
  }
}

export default Verify;
