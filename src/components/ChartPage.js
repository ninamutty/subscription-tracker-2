import React, { Component } from 'react';
import { Link } from 'react-router';
import CategoriesChart from './Charts/CategoriesChart';
import CategoryChart from './Charts/CategoryChart';

class ChartPage extends Component {
  constructor(props) {
    super(props);
    this.userID = props.params.user_id;
    this.state = {user: {}, categorySelected: false, clickName: '', data: []};
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
    console.log("selectCategory");
    console.log(this);
    console.log(event.name);
    console.log(data);
    this.setState({categorySelected: true, data: data, clickName: event.name})
  }

  renderACategory = () => {
    if (this.state.categorySelected == true) {
      console.log("selected");
      return (
        <div id="categories-chart-container">
          <h4> Monthly Spending In {this.state.clickName} </h4>
          <CategoryChart clickName={this.state.clickName} data={this.state.data} subscriptions={this.state.user.subscriptions}/>
        </div>
      )
    }
  }

  renderCategoriesChart = () => {
    if (this.state.user.name !== undefined) {
      console.log(this.userID);
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
      </div>
    )
  }
}

export default ChartPage;
