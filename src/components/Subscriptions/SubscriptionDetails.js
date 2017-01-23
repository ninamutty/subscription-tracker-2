import React, { Component } from 'react';
import Subscription from './Subscription';
import Trial from './Trial'
import moment from 'moment';
import { browserHistory } from 'react-router';

class SubscriptionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {subscription: {}, isTrial: false}
    this.findSubscription = this.findSubscription.bind(this)
    this.checkSubscription = this.checkSubscription.bind(this)
    this.renderSubscription = this.renderSubscription.bind(this)
    this.deleteSubscription = this.deleteSubscription.bind(this)
  }

  deleteSubscription(event) {
    event.preventDefault();
    const BASE_URL = 'http://localhost:8080/'
    let userID = this.props.userID;
    let subscriptionID = this.props.subscriptionID;
    let type;
    if (this.state.isTrial == true) {
      type = 'trials';
    } else {
      type = 'subscriptions';
    }

    if (window.confirm("Are you sure?")) {
      fetch(`${BASE_URL}api/users/${userID}/${type}/${subscriptionID}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(() => {
        let deletedSubscriptionID = subscriptionID

        let path = `/home/${userID}/dashboard`;
        this.setState({subscription: {}});
        browserHistory.push({
          pathname: path,
          state: {deletedSubscriptionID: deletedSubscriptionID}
        });
      }).catch(function(err) {
        console.log(err);
      });
    };
  }

  findSubscription() {
      this.props.subscriptions.map((subscription) => {
        if (subscription._id == this.props.subscriptionID) {
          return this.setState({subscription: subscription});
        }
      });
      this.props.trials.map((trial) => {
        if (trial._id === this.props.subscriptionID) {
          return this.setState({subscription: trial, isTrial: true});
        }
      })
  }


  checkSubscription() {
    if (this.state.subscription._id !== this.props.subscriptionID) {
       this.findSubscription();
    }
  }

  findNextBill() {
    if (this.state.isTrial === false) {
      let nextBill = moment(new Date(this.state.subscription.nextBillingDate)).format("dddd, MMMM Do YYYY")
      return <p>Next Billing Date: {nextBill} </p>
    }
  }

  renderSubscription() {
    console.log(this.state.subscription);
    if (this.state.subscription.name !== undefined) {
      let subscription = this.state.subscription
      let firstBill = moment(new Date(subscription.firstBillDate)).format("dddd, MMMM Do YYYY")

      let notificationDate = moment(new Date(subscription.nextBillingDate)).format("dddd, MMMM Do YYYY")

      return (
        <div>
          <h2>{subscription.name}</h2>
          <p> Price: ${subscription.cost/100.00}</p>
          <p> Category: {subscription.category}</p>
          <p> Your Rating: {subscription.userRating}</p>

          <p> First Billing Date: {firstBill}</p>
          { this.findNextBill() }
          <p> Billing Cycle: {subscription.billingCycle}</p>
          <button onClick={this.deleteSubscription}> Delete </button>
        </div>

      );
    }
  }

  render() {
    console.log("rendering subscription detail");
    this.checkSubscription();
    return (
      <div>
        {this.renderSubscription()}
      </div>

    );
  }
}

export default SubscriptionDetails;
