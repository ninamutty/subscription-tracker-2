import React from 'react';

const Trial = props => {
  let firstBill = Date.parse(props.firstBillDate)

  return (
    <li className="trial-solo">
      <h3> { props.name } </h3>
      <h3> First Bill: {firstBill}</h3>
      <p> Price: ${props.cost/100.00} </p>
      <p> Billing Cycle: {props.billingCycle} </p>
      <p> Category: {props.category} </p>
    </li>
  );

}

export default Trial;


//
// const Featured = props => {
//   let topic = props.params.topic;
//   let name = props.params.name;
//
//   return (
//     <div className="main-content">
//       <h2> {name} </h2>
//       <p>Introducing <strong> {name}</strong>, a teacher who loves teaching courses about <strong>{topic}</strong>!</p>
//     </div>
//   );
// }
