import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

class Trial extends Component {
  render() {
    let firstBill = moment(new Date(this.props.firstBillDate)).format("dddd, MMMM Do YYYY");
    // console.log(this.props);


    let path=`/home/${this.props.userID}/featured/${this.props.id}`

    return (
      <div>
      <li className="trial-solo">
          <Link to={path} activeClassName="active-sub" {...this.props} > { this.props.name } </Link>
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
