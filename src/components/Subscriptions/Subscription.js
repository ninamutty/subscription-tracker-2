import React, { Component } from 'react';
import { Link } from 'react-router';

class Subscription extends Component {

  render() {
    var path=`/home/${this.props.userID}/featured/${this.props.id}`

    return (
      <div>
        <li className="subscription-solo">
          <Link to={path} activeClassName="active-sub" {...this.props} > { this.props.name } </Link>
          <p> Price: ${this.props.cost/100.00} </p>
          <p> Category: {this.props.category} </p>
        </li>
        { this.props.children }
      </div>
    );
  }
}

export default Subscription;
