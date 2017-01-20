import React, { Component } from 'react';
import {Link} from 'react-router';

// Components
import SubscriptionContainer from './Subscriptions/SubscriptionContainer';
import TrialContainer from './Subscriptions/TrialContainer';
import SubscriptionDetails from './Subscriptions/SubscriptionDetails';


class Home extends Component {
  constructor(props) {
    super(props);
    this.userID = props.params.user_id;
    this.state = {user: {}, showDetails: false, subscriptionID: ''};
    this.setSelectState = this.setSelectState.bind(this);
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
    // console.log("CHECK USER");
    if (this.state.user.name === undefined) {
      this.getUser(this.userID)
    }
  }

  selectSubscription() {
    let id = this.props.id;
    this.props.setSelectState(id)
  }

  setSelectState = (id) => {
    this.setState({showDetails: false, subscriptionID: ''});
    return this.setState({showDetails: true, subscriptionID: id});
  }

  showDetails = () => {
    if (this.state.showDetails === true) {
      return  <SubscriptionDetails subscriptionID={this.state.subscriptionID} subscriptions={this.state.user.subscriptions} trials={this.state.user.trials} />
    }
  }

  sendSubscriptions() {
    // console.log("SEND SUBS");
    if (this.state.user.name !== undefined && this.state.user.subscriptions.length !== 0) {
         return <SubscriptionContainer subscriptions={this.state.user.subscriptions} onClick={this.selectSubscription} setSelectState={this.setSelectState}/>
    }
  }

  sendTrials() {
    // console.log("SEND TRIALS");
    if (this.state.user.name !== undefined && this.state.user.trials.length !== 0) {
      return <TrialContainer trials={this.state.user.trials} onClick={this.selectSubscription} setSelectState={this.setSelectState} />
    }
  }


  renderUser() {
    // console.log("RENDER USER");
    // console.log(this.state.user);
    if (this.state.user.name !== undefined) {
      // console.log("IN HERE");
      console.log(this.state.user._id);
      let formPath = `/home/${this.state.user._id}/form`
      return (
        <div className="inner-home">
          <h1> Welcome, {this.state.user.name} </h1>
          <Link to={formPath} {...this.props}> + Add </Link>
          {this.sendSubscriptions()}
          {this.sendTrials()}
          {this.showDetails()}

          {this.props.children}
        </div>
      )
    }
  }




  render() {
    this.checkUser()
    return (
      <div className="Home">
        {this.renderUser()}
      </div>
    );
  }
}






export default Home;
