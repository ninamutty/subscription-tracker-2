import React, { Component } from 'react';
import { Link } from 'react-router';
import CategoriesChart from './Charts/CategoriesChart';
import CategoryChart from './Charts/CategoryChart';
import SubscriptionChartDetails from './Charts/SubscriptionChartDetails';


class ChartPage extends Component {
  constructor(props) {
    super(props);
    this.userID = props.params.user_id;
    this.state = {user: {}, categorySelected: false, clickName: '', data: [], selectedSubscription: {}};
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
    // console.log("selectCategory");
    // console.log(this);
    // console.log(event.name);
    // console.log(data);
    this.setState({categorySelected: true, data: data, clickName: event.name})
  }

  renderACategory = () => {
    if (this.state.categorySelected == true) {
      // console.log("selected");
      return (
        <div id="categories-chart-container">
          <h4> Monthly Spending In {this.state.clickName} </h4>
          <CategoryChart clickName={this.state.clickName} data={this.state.data} subscriptions={this.state.user.subscriptions} onClick={this.clickSubscription}/>
        </div>
      )
    }
  }

  clickSubscription = (data, event) => {
    // console.log("clickSubscription");
    // console.log(this);
    // console.log(event.name);
    // console.log(data);
    data.map((subscription) => {
      console.log(">>>>>>>>>");
      console.log(subscription.name);
      console.log(event.name);
      console.log(subscription.name == event.name);
      console.log(">>>>>>>>>");
      if (subscription.name == event.name) {
        console.log("here here here");
        this.setState({selectedSubscription: subscription})
      }
    })
  }

  renderSelectedSubscription = (data, event) => {
    console.log(this.state.selectedSubscription);
    if (this.state.selectedSubscription.name !== undefined) {
      console.log("in here woo");
      return (
        <div id="selected-subscription-details">
          <SubscriptionChartDetails subscription={this.state.selectedSubscription} />
        </div>
      )
    }
  }

  renderCategoriesChart = () => {
    if (this.state.user.name !== undefined) {
      // console.log(this.userID);
      return (
        <div id="categories-chart-container">
          <h4> Monthly Spending By Category </h4>
          <CategoriesChart subscriptions={this.state.user.subscriptions} onClick={this.selectCategory}/>
        </div>
      )
    }
  }



  render() {
    this.checkUser()
    return(
      <div className="main-chart-container">
        {this.renderCategoriesChart()}
        {this.renderACategory()}
        {this.renderSelectedSubscription()}
      </div>
    )
  }
}

export default ChartPage;
