import React, { Component } from 'react';
import moment from 'moment';

class SubscriptionDetails extends Component {
  constructor(props) {
    super(props);
    this.selectedSubscription = {};
    this.state = {dataSubscription: this.props.subscription, subscriptionList: this.props.subscriptionList}
  }

  toStars = (rating) => {
    let printed_stars = "";
    let ratingRound = Math.floor(rating)
    if (rating === undefined) {
      printed_stars = "Not Yet Rated";
    } else {
      for (var i = 0; i < ratingRound; i++) {
        printed_stars += "★";
      }
      for (var j=0; j < (5-ratingRound); j++) {
        printed_stars += "☆";
      }
    }
    return printed_stars;
  }


  renderSubscription() {
    // if (this.selectedSubscription.name !== this.props.subscription.name) {
    if (this.props.subscription.name !== undefined) {

      this.state.subscriptionList.map((subscription) => {
        if (this.props.subscription.name == subscription.name) {
          this.selectedSubscription = subscription;
        }
      })

      let firstBill = moment(new Date(this.selectedSubscription.firstBillDate)).format("MMMM Do YYYY")
      let nextBill = moment(new Date(this.selectedSubscription.nextBillingDate)).format("MMMM Do YYYY")
      let stars = this.toStars(this.selectedSubscription.userRating)

      return (
        <div className="chart-details-inner-container">
          <h2>{this.selectedSubscription.name}</h2>
          <p> <span className="details-title"> Price: </span> ${this.selectedSubscription.cost/100.00}</p>
          <p> <span className="details-title"> Category: </span> {this.selectedSubscription.category}</p>
          <p> <span className="details-title"> Your Rating: </span> {stars}</p>
          <p> <span className="details-title"> First Bill: </span> {firstBill}</p>
          <p> <span className="details-title"> Next Bill: </span> {nextBill} </p>
          <p> <span className="details-title"> Billing Cycle: </span> {this.selectedSubscription.billingCycle}</p>
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
