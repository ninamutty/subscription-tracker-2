import React, { Component } from 'react';
import { Link } from 'react-router';

class Subscription extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="single-sub-container-div" data-equalizer-watch="foo">
        <li className="subscription-solo">
          <h3 className="name-link" onClick={this.props.onClick.bind(this, this.props.id)}> { this.props.name } </h3>
          <p> Price:  ${this.props.cost/100.00} </p>
          <div className="category-listing-height">
          <p> Category:  {this.props.category} </p>
          </div>
        </li>
        { this.props.children }
      </div>
    );
  }
}

export default Subscription;
