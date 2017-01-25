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
    const BASE_URL = 'http://custom-env.rfpftqwtew.us-east-1.elasticbeanstalk.com/'
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
      let nextBill = moment(new Date(this.state.subscription.nextBillingDate)).format("MMMM Do, YYYY")
      let billingCycle = (this.state.subscription.billingCycle)
      return (
        <p className="column small-12 medium-4"> <span className="details-title">Next Billing Date: </span> {nextBill} </p>
      );
    }
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
    if (this.state.subscription.name !== undefined) {
      let subscription = this.state.subscription
      let firstBill = moment(new Date(subscription.firstBillDate)).format("MMMM Do, YYYY");
      let notificationDate = moment(new Date(subscription.nextBillingDate)).format("MMMM Do, YYYY");
      let stars = this.toStars(subscription.userRating)

      return (
        <div className="subscription-details-container row">
          <h2 className="subscription-details-name column small-12">{subscription.name}</h2>
          <div className="details-container-inside column small-12 row">
            <div className="details-no-button column small-12 medium-10 large-10 row">
              <p className="column small-12 medium-4"> <span className="details-title"> Price:</span> ${subscription.cost/100.00}</p>
              <p className="column small-12 medium-4"> <span className="details-title"> Category:</span> {subscription.category}</p>
              <p className="column small-12 medium-4"> <span className="details-title"> Your Rating:</span> {stars}</p>

              <p className="column small-12 medium-4"> <span className="details-title"> First Billing Date:</span> {firstBill}</p>
              { this.findNextBill() }
                <p className="column small-12 medium-4"> <span className="details-title"> Billing Cycle:</span> {this.state.subscription.billingCycle} </p>
            </div>
            <button className="button hollow alert column small-12 medium-1 large-1 subscription-delete-button" onClick={this.deleteSubscription}> Delete </button>
          </div>
        </div>

      );
    } else {
      return (<div></div>);
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


//               <p className="column small-12 medium-4"> <span className="details-title"> Billing Cycle: </span> {subscription.billingCycle}</p>
export default SubscriptionDetails;
