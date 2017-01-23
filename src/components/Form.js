import React, { Component } from 'react';
import {Link, browserHistory} from 'react-router';
import CurrencyInput from 'react-currency-input';
import DatePicker from 'react-datepicker';
import moment from 'moment';
require('react-datepicker/dist/react-datepicker.css');


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {name: 'Subscription', cost: '0.00', firstBillDate: moment(), userRating: '5', category: 'Shopping', nextBillingDate: moment(), billingCycle: 'Monthly', isTrial: "false" }
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.createNew = this.createNew.bind(this);
    this.createSubscription = this.createSubscription.bind(this);
    this.createTrial = this.createTrial.bind(this);
  }

  formSubmit(event) {
    event.preventDefault();
    let cost = this.state.cost;
    cost = parseInt(cost.replace('$', '').replace('.', ''));
    let userRating = parseInt(this.state.userRating);
    let firstBillDate = new Date(this.state.firstBillDate._d)
    let nextBillingDate = new Date(this.state.nextBillingDate._d)

    let subscription = {
      name: this.state.name,
      cost: cost,
      userRating: userRating,
      firstBillDate: firstBillDate,
      nextBillingDate: nextBillingDate,
      category: this.state.category,
      billingCycle: this.state.billingCycle
    }

    this.createNew(subscription);
  }

  createNew(subscription) {
    const BASE_URL = 'http://localhost:8080/'
    let userID = this.props.params.user_id

    // Post to user subscriptions or user trials
    if (this.state.isTrial == "false") {
       this.createSubscription(subscription, BASE_URL, userID);
    } else if (this.state.isTrial == "true") {
      this.createTrial(subscription, BASE_URL, userID);
    }
  }

  createSubscription(subscription, BASE_URL, userID) {
    fetch(`${BASE_URL}api/users/${userID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": subscription.name,
        "cost": subscription.cost,
        "userRating": subscription.userRating,
        "firstBillDate": subscription.firstBillDate,
        "nextBillingDate": subscription.nextBillingDate,
        "category": subscription.category,
        "billingCycle": subscription.billingCycle
      })
    }).then( (response) => {
       return response.json();
    }).then((response) => {
        let newSubscriptionID = response.subscription._id;

        let path = `/home/${userID}/dashboard`;
        browserHistory.push({
          pathname: path,
          state: {newSubscriptionID: newSubscriptionID}
        });
    }).catch(function(err) {
      console.log(err);
    });
  }

  createTrial(subscription, BASE_URL, userID) {
    fetch(`${BASE_URL}api/users/${userID}/trials`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": subscription.name,
        "cost": subscription.cost,
        "userRating": subscription.userRating,
        "firstBillDate": subscription.firstBillDate,
        "nextBillingDate": subscription.nextBillingDate,
        "category": subscription.category,
        "billingCycle": subscription.billingCycle
      })
    }).then( (response) => {
      return response.json();
    }).then((response) => {
      let newSubscriptionID = response.trial._id;
      // console.log(subscriptionID);
      let path = `/home/${userID}/dashboard`;
      browserHistory.push({
        pathname: path,
        state: {newSubscriptionID: newSubscriptionID}
      });    }).catch(function(err) {
      console.log(err);
    });
  }



  handleClick = (changeName) => {
    var change = {};
    change[changeName] = '';
    this.setState(change);
  }


  handleChange = (changeName, event) => {
    var change = {};
    change[changeName] = event.target.value;
    this.setState(change);
  }

  handleCostAndDateChange = (changeName, value) => {
    var change = {};
    change[changeName] = value;
    this.setState(change);
  }


  render() {
    // console.log(this.props);

    let user_id = this.props.params.user_id
    return (
      <div className="add-subscription-form">
        <h2> Add Subscription </h2>
        <form onSubmit={this.formSubmit}>
          <label>
            Subscription Name:
            <input type="text" value={this.state.name} onChange={this.handleChange.bind(this, 'name')} onClick={this.handleClick.bind(this, 'name')} />
          </label>
          <label>
            Price:
            <CurrencyInput value={this.state.cost} onChange={this.handleCostAndDateChange.bind(this, 'cost')} decimalSeparator="." thousandSeparator="," prefix="$" onClick={this.handleClick.bind(this, 'cost')} />
          </label>
          <label>
            Category:
            <select value={this.state.category} onChange={this.handleChange.bind(this, 'category')}>
              <option value="Shopping">Shopping</option>
              <option value="Music Streaming">Music Streaming</option>
              <option value="Video Streaming">Video Streaming</option>
              <option value="Cloud Storage">Cloud Storage</option>
              <option value="Health Services">Health Services</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Your Rating:
            <select value={this.state.userRating} onChange={this.handleChange.bind(this, 'userRating')}>
              <option value="0">☆☆☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="3">★★★☆☆</option>
              <option value="4">★★★★☆</option>
              <option value="5">★★★★★</option>
            </select>
          </label>

          <label>
            First Billing Date:
            <DatePicker selected={this.state.firstBillDate} onChange={this.handleCostAndDateChange.bind(this, 'firstBillDate')} />
          </label>

          <label>
            Next Billing Date:
            <DatePicker selected={this.state.nextBillingDate} onChange={this.handleCostAndDateChange.bind(this, 'nextBillingDate')} />
          </label>

          <label>
            Billing Cycle:
            <select value={this.state.billingCycle} onChange={this.handleChange.bind(this, 'billingCycle')}>
              <option value="None">None</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </label>

          <label>
            Subscription in Trial:
            <select value={this.state.isTrial} onChange={this.handleChange.bind(this, 'isTrial')}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }

}

export default Form;
