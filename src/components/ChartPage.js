import React, { Component } from 'react';
import { Link } from 'react-router';
import CategoriesChart from './Charts/CategoriesChart';

class ChartPage extends Component {
  constructor(props) {
    super(props);
    this.userID = props.params.user_id;
    this.state = {user: {}};
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

  renderUser = () => {
    if (this.state.user.name !== undefined) {
      console.log(this.userID);
      return (
        <div id="categories-chart-container">
          <h4> Monthly Spending By Category </h4>
          <CategoriesChart subscriptions={this.state.user.subscriptions}/>
        </div>
      )
    }
  }



  render() {
    this.checkUser()
    return(
      <div className="main-chart-container">
        {this.renderUser()}
      </div>
    )
  }
}

export default ChartPage;
