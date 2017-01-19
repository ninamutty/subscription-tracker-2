import React, { Component } from 'react';
import { Link } from 'react-router';

class Subscription extends Component {

  render() {
    console.log(this.props)

    return (
      <li className="subscription-solo">
        <h3 onClick> { this.props.name } </h3>
        <p> Price: ${this.props.cost/100.00} </p>
        <p> Category: {this.props.category} </p>
      </li>
    );
  }
}

export default Subscription;

// <NavLink to="/courses/html">HTML</NavLink>
// <Link to= activeClassName="active" />
