import React, { Component } from 'react';
import { Link } from 'react-router';
import CategoriesChart from './Charts/CategoriesChart';
import CategoryChart from './Charts/CategoryChart';
import SubscriptionChartDetails from './Charts/SubscriptionChartDetails';


class ChartPage extends Component {
  constructor(props) {
    super(props);
    this.userID = props.params.user_id;
    this.monthlyCost = 0;
    this.state = {user: {}, categorySelected: false, clickName: '', data: [], selectedSubscription: {}, eventStuff: {}, totalSpend: 0};
  }

  calculateCost = () => {
    this.monthlyCost = 0;
    this.state.user.subscriptions.map((subscription) => {
      let cost;
      if (subscription.billingCycle == "Weekly") {
        cost = subscription.cost * 4;
      } else if (subscription.billingCycle == "Yearly") {
        cost = subscription.cost / 12;
      } else if (subscription.billingCycle == "Monthly") {
        cost = subscription.cost
      }

      this.monthlyCost += cost;
    });
    // return this.monthlyCost;
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

  selectCategory = (data, event) => {
    this.setState({categorySelected: true, data: data, clickName: event.name, totalSpend: event.total})
  }

  renderACategory = () => {
    if (this.state.categorySelected == true) {
      console.log("SPEND STATE: "+this.state.totalSpend);
      return (
        <div className="category-chart-container">
          <h4> {this.state.clickName} Spending </h4>
          <CategoryChart clickName={this.state.clickName} data={this.state.data} subscriptions={this.state.user.subscriptions} onClick={this.clickSubscription} totalSpend={this.state.totalSpend}/>
        </div>
      )
    }
  }

  clickSubscription = (data, event) => {
    data.map((subscription) => {
      if (subscription.name == event.name) {
        this.setState({selectedSubscription: subscription, eventStuff: event})
      }
    })
  }

  renderSelectedSubscription = () => {
    if (this.state.selectedSubscription.name !== undefined) {
      return (
        <div className="selected-subscription-details">
          <SubscriptionChartDetails subscription={this.state.selectedSubscription} subscriptionList={this.state.user.subscriptions} />
        </div>
      )
    }
  }

  renderCategoriesChart = () => {
    if (this.state.user.name !== undefined) {
      return (
        <div className="categories-chart-container">
          <h4> Monthly Spending By Category </h4>
          <CategoriesChart subscriptions={this.state.user.subscriptions} onClick={this.selectCategory}/>
        </div>
      )
    }
  }

  renderPricingDetails = () => {
    if (this.state.user.name !== undefined) {
      this.calculateCost();
      return (
        <div className="main-spending-details row">
          <h4> Overview  </h4>
          <p className="column small-12 medium-4"> <span className="details-title"> Total Per Week: </span>  ${((this.monthlyCost / 4 ) / 100.00).toFixed(2)} </p>
          <p className="column small-12 medium-4"> <span className="details-title"> Total Per Month: </span> ${(this.monthlyCost / 100.00).toFixed(2)} </p>
          <p className="column small-12 medium-4"> <span className="details-title"> Total Per Year: </span> ${((this.monthlyCost * 12 ) / 100.00).toFixed(2)} </p>
        </div>
      )
    }
  }


  render() {
    this.checkUser()
    return(
      <div className="main-chart-container">
        <div className="dashboard-top">
          <h2 className="welcome-person column small-12 medium-11"> Welcome, {this.state.user.name} </h2>
        </div>
        <h2 className="spending-header"> Spending </h2>
        {this.renderPricingDetails()}
        {this.renderCategoriesChart()}
        {this.renderACategory()}
        {this.renderSelectedSubscription()}
      </div>
    )
  }
}

export default ChartPage;
