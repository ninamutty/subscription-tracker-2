import React, { Component } from 'react';
import Subscription from './Subscription';
import Trial from './Trial'
import moment from 'moment';

class SubscriptionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {subscription: {}, isTrial: false}
    this.findSubscription = this.findSubscription.bind(this)
    this.checkSubscription = this.checkSubscription.bind(this)
    this.renderSubscription = this.renderSubscription.bind(this)
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
          <p> Notification Date: {notificationDate}</p>
          <p> Billing Cycle: {subscription.billingCycle}</p>
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
