import React from 'react';

const Subscription = props => (
  <li className="subscription-solo">
    <h3> { props.name } </h3>
    <p> Price: ${props.cost/100.00} </p>
    <p> Billing Cycle: {props.billingCycle} </p>
    <p> Category: {props.category} </p>
  </li>
);

export default Subscription;
