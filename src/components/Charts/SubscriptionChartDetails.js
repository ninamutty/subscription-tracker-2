import React, { Component } from 'react';
// import Subscription from './Subscription';
// import Trial from './Trial'
import moment from 'moment';

class SubscriptionDetails extends Component {
  constructor(props) {
    super(props);
    this.selectedSubscription = {};
    this.state = {dataSubscription: this.props.subscription, subscriptionList: this.props.subscriptionList}
  }

  renderSubscription() {
    // if (this.selectedSubscription.name !== this.props.subscription.name) {
    if (this.props.subscription.name !== undefined) {

      this.state.subscriptionList.map((subscription) => {
        if (this.props.subscription.name == subscription.name) {
          this.selectedSubscription = subscription;
        }
      })

      let firstBill = moment(new Date(this.selectedSubscription.firstBillDate)).format("dddd, MMMM Do YYYY")
      let nextBill = moment(new Date(this.selectedSubscription.nextBillingDate)).format("dddd, MMMM Do YYYY")

      return (
        <div className="chart-details-inner-container">
          <h2>{this.selectedSubscription.name}</h2>
          <p> Price: ${this.selectedSubscription.cost/100.00}</p>
          <p> Category: {this.selectedSubscription.category}</p>
          <p> Your Rating: {this.selectedSubscription.userRating}</p>
          <p> First Billing Date: {firstBill}</p>
          <p> Next Billing Date: {nextBill} </p>
          <p> Billing Cycle: {this.selectedSubscription.billingCycle}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="chartpage-subscription-details">
        {this.renderSubscription()}
      </div>

    );
  }
}

export default SubscriptionDetails;
