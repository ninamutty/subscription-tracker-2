import React, { Component } from 'react';
import SubscriptionContainer from './Subscriptions/SubscriptionContainer';
import TrialContainer from './Subscriptions/TrialContainer';


class Home extends Component {
  constructor(props) {
    super(props);
    this.userID = props.params.user_id;
    console.log(this.userID);
    this.state = {user: {}, isFetching: true}
  }

  getUser(userID) {
    const BASE_URL = 'http://localhost:8080/'

    fetch(`${BASE_URL}api/users/${userID}`, {
      accept: 'application/json',
    }).then( (response) => {
      return response.json();
    }).then( (response) => {
      this.setState({user: response.user})
    }).catch(function(err) {
      console.log(err);
    });
  }

  checkUser() {
    if (this.state.user.name === undefined) {
      this.getUser(this.userID)
    }
  }

  sendSubscriptions() {
    console.log(this.state.user);
    console.log("send");
    if (this.state.user.name !== undefined && this.state.user.subscriptions.length !== 0) {
        return <SubscriptionContainer subscriptionList={this.state.user.subscriptions} />
    }
  }

  sendTrials() {
    console.log(this.state.user);
    console.log("send");
    if (this.state.user.name !== undefined && this.state.user.trials.length !== 0) {
        return <TrialContainer trialList={this.state.user.trials} />
    }
  }

  render() {
    this.checkUser();

    return (
      <div className="Home">
        <h1> Welcome, {this.state.user.name} </h1>
        {this.sendSubscriptions()}
        {this.sendTrials()}
      </div>
    );
  }
}


export default Home;
