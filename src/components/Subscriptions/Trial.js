import React from 'react';
import moment from 'moment';
moment().format();

const Trial = props => {
  let firstBill = moment(new Date(props.firstBillDate)).format("dddd, MMMM Do YYYY")
  return (
    <li className="trial-solo">
      <h3> { props.name } </h3>
      <h4> First Bill: {firstBill}</h4>
      <p> Price: ${props.cost/100.00} </p>
      <p> Billing Cycle: {props.billingCycle} </p>
      <p> Category: {props.category} </p>
    </li>
  );

}

export default Trial;
