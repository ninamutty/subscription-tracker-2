import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';


class Home extends Component {

  constructor(props) {
    super(props);
    this.userID = this.props.params.user_id
    this.state = {user: {}}
  }

  // find user in this file rather than dashboard so the info/id can be passed to either
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

  logout = (e) => {
    e.preventDefault();
    browserHistory.push('/')
  }


  render() {
    let chartPath = `/home/${this.userID}/charts`;
    let subscriptionPath = `/home/${this.userID}/dashboard`;
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
