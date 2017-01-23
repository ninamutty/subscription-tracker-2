import React, { Component } from 'react';
// import Subscription from './Subscription';
// import Trial from './Trial'
import moment from 'moment';

class SubscriptionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {subscription: this.props.subscription}
    // this.deleteSubscription = this.deleteSubscription.bind(this)
  }

  // deleteSubscription(event) {
  //   event.preventDefault();
  //   const BASE_URL = 'http://localhost:8080/'
  //   let userID = this.props.userID;
  //   let subscriptionID = this.props.subscriptionID;
  //   let type;
  //
  //   if (window.confirm("Are you sure?")) {
  //     fetch(`${BASE_URL}api/users/${userID}/subscriptions/${subscriptionID}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       }
  //     }).then(() => {
  //       let path = `/home/${userID}/dashboard`;
  //       this.forceUpdate();
  //       browserHistory.push(path);
  //     }).catch(function(err) {
  //       console.log(err);
  //     });
  //   };
  // }


  renderSubscription() {
    console.log("*************");
    console.log(this.state.subscription);
    if (this.state.subscription.name !== undefined) {
      let subscription = this.state.subscription
      let firstBill = moment(new Date(subscription.firstBillDate)).format("dddd, MMMM Do YYYY")
      let nextBill = moment(new Date(this.state.subscription.nextBillingDate)).format("dddd, MMMM Do YYYY")
      let notificationDate = moment(new Date(subscription.nextBillingDate)).format("dddd, MMMM Do YYYY")

      return (
        <div className="chartpage-subscription-details">
          <h2>{subscription.name}</h2>
          <p> Price: ${subscription.cost/100.00}</p>
          <p> Category: {subscription.category}</p>
          <p> Your Rating: {subscription.userRating}</p>
          <p> First Billing Date: {firstBill}</p>
          <p>Next Billing Date: {nextBill} </p>
          <p> Billing Cycle: {subscription.billingCycle}</p>
        </div>

      );
    }
  }

  render() {
    console.log(this.props.subscription);
    console.log("rendering subscription detail");
    return (
      <div>
        {this.renderSubscription()}
      </div>

    );
  }
}

export default SubscriptionDetails;
