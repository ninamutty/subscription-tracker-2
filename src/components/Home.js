import React, { Component } from 'react';
import { Link } from 'react-router';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {userID: this.props.params.user_id}
  }

  // find user in this file rather than dashboard so the info/id can be passed to either

  render() {
    let chartPath = `/home/${this.state.userID}/charts`;
    let subscriptionPath = `/home/${this.state.userID}/dashboard`;
    return (
      <div>
          <Link to={chartPath} activeClassName="active" > Spending </Link>
          <Link to={subscriptionPath} activeClassName="active" > Subscriptions </Link>

        {this.props.children}
      </div>
    )
  }
}

export default Home;
