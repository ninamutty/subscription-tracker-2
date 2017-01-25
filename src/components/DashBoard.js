import React, { Component } from 'react';
import { Link } from 'react-router';

// Components
import SubscriptionContainer from './Subscriptions/SubscriptionContainer';
import TrialContainer from './Subscriptions/TrialContainer';
import SubscriptionDetails from './Subscriptions/SubscriptionDetails';


class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.userID = props.params.user_id;
    this.state = {user: {}, showDetails: false, subscriptionID: ''};
    this.setSelectState = this.setSelectState.bind(this);
  }


  getUser(userID) {
    const BASE_URL = 'http://custom-env.rfpftqwtew.us-east-1.elasticbeanstalk.com/'

    fetch(`${BASE_URL}api/users/${userID}`, {
      accept: 'application/json',
    }).then( (response) => {
      return response.json();
    }).then( (response) => {
      this.setState({user: response.user, showDetails: false})
    }).catch(function(err) {
      console.log(err);
    });
  }

  checkUser() {
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
      // console.log(this.props.location.deleteSubscriptionID);
      // console.log(this.state.subscriptionID);
      return  <SubscriptionDetails subscriptionID={this.state.subscriptionID} subscriptions={this.state.user.subscriptions} trials={this.state.user.trials} userID={this.userID}/>
    } else {
      return (<div></div>);
    }
  }

  sendSubscriptions() {
    if (this.state.user.name !== undefined && this.state.user.subscriptions.length !== 0) {
         return <SubscriptionContainer subscriptions={this.state.user.subscriptions} onClick={this.selectSubscription} setSelectState={this.setSelectState}/>
    }
  }

  sendTrials() {
    if (this.state.user.name !== undefined && this.state.user.trials.length !== 0) {
      return <TrialContainer trials={this.state.user.trials} onClick={this.selectSubscription} setSelectState={this.setSelectState} />
    }
  }

  renderUser() {
    console.log(this.state.user);
    if (this.state.user.name !== undefined) {
      if (this.props.location.state !== undefined && this.props.location.state.newSubscriptionID !== undefined) {
        let arrayOfIDs = [];
        this.state.user.subscriptions.map((subscription) => {
          arrayOfIDs.push(subscription._id);
        })
        this.state.user.trials.map((trial) => {
          arrayOfIDs.push(trial._id);
        })
        if (!arrayOfIDs.includes(this.props.location.state.newSubscriptionID) ) {
         this.getUser(this.userID);
        }
      }

      if (this.props.location.state !== undefined && this.props.location.state.deletedSubscriptionID !== undefined) {
        let arrayOfIDs = [];
        this.state.user.subscriptions.map((subscription) => {
          arrayOfIDs.push(subscription._id);
        })
        this.state.user.trials.map((trial) => {
          arrayOfIDs.push(trial._id);
        })
        if (arrayOfIDs.includes(this.props.location.state.deletedSubscriptionID) ) {
          // this.removeSelectState();
          this.getUser(this.userID);
        }
      }


      let formPath = `/home/${this.state.user._id}/dashboard/form`;
      return (
        <div className="inner-dashboard">
          <div className="dashboard-top">
            <h2 className="welcome-person column small-12 medium-11"> Welcome, {this.state.user.name} </h2>
          </div>

          {this.sendSubscriptions()}
          {this.sendTrials()}
          <Link to={formPath} whenSubmit={this.formSubmit} className="button hollow add-button"> + New </Link>
          {this.showDetails()}
          {this.props.children}
        </div>
      )
    } else {
      let formPath = `/home/${this.state.user._id}/dashboard/form`;
      return (
        <div>
          <h2>Please Add a Subscription to Begin </h2>
          <Link to={formPath} whenSubmit={this.formSubmit} className="button hollow add-button"> + New </Link>
        </div>
      )
    }
  }


  render() {
    {this.checkUser()}
    return (
      <div className="DashBoard">
        {this.renderUser()}
      </div>
    );
  }
}






export default DashBoard;
