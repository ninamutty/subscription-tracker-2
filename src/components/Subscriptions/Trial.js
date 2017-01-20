import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

class Trial extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let firstBill = moment(new Date(this.props.firstBillDate)).format("dddd, MMMM Do YYYY");
    // console.log(this.props);


    return (
      <div className="single-sub-container-div">
      <li className="trial-solo">
          <h3 className="name-link" onClick={this.props.onClick.bind(this)}> { this.props.name } </h3>
          <h4> First Bill Due: {firstBill} </h4>
          <p> Price: ${this.props.cost/100.00} </p>
          <p> Category: {this.props.category} </p>
        </li>
        { this.props.children }
      </div>
    );
  }


}

export default Trial;
