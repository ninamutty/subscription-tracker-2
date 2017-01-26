import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

class Trial extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let firstBill = moment(new Date(this.props.firstBillDate)).format("MMMM Do, YYYY");

    return (
      <div className="single-trial-container-div">
      <h2 className="trial-header"> Upcoming Trial Charge </h2>
      <li className="trial-solo">
          <h3 className="name-link" onClick={this.props.onClick.bind(this)}> { this.props.name } </h3>
          <p className="first-charge"> First Charge: {firstBill} </p>
          <p> Price: ${this.props.cost/100.00} </p>
          <p> Category: {this.props.category} </p>
        </li>
        { this.props.children }
      </div>
    );
  }


}

export default Trial;
