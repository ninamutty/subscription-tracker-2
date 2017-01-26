import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';


class Home extends Component {

  constructor(props) {
    super(props);
    this.userID = this.props.params.user_id
    this.state = {user: {}}
  }

  // find user in this file rather than dashboard so the info/id can be passed to either
  getUser(userID) {
    const BASE_URL = 'http://custom-env.rfpftqwtew.us-east-1.elasticbeanstalk.com/'

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

  logout = (e) => {
    e.preventDefault();
    hashHistory.push('/')
  }


  render() {
    let chartPath = `/subscription-tracker-2/home/${this.userID}/charts`;
    let subscriptionPath = `/subscription-tracker-2/home/${this.userID}/dashboard`;
    return (
      <div>
          <div className="navigation-links">
            <button className="logout-link" onClick={this.logout} > Logout </button>
            <Link to={chartPath} activeClassName="active"> Spending </Link>
            <Link to={subscriptionPath} activeClassName="active"> Subscriptions </Link>
          </div>
        {this.props.children}
      </div>
    )
  }
}

export default Home;
