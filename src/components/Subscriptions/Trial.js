import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

const Trial = props => {
  let firstBill = moment(new Date(props.firstBillDate)).format("dddd, MMMM Do YYYY");
  console.log(props);

  // path not coming through
  let path=`/home/${props.userID}/featured/${props.id}`

  return (
    <div>
      <li className="trial-solo">
        <Link to={path} activeClassName="active-sub" {...props} > { props.name } </Link>
        <h4> First Bill: {firstBill} </h4>
        <p> Price: ${props.cost/100.00} </p>
        <p> Category: {props.category} </p>
      </li>
      { props.children }
    </div>
  );

}

export default Trial;

//
// var path=`/home/${this.props.userID}/featured/${this.props.id}`
//
// return (
//   <div>
//     <li className="subscription-solo">
//       <Link to={path} activeClassName="active-sub" {...this.props} > { this.props.name } </Link>
//       <p> Price: ${this.props.cost/100.00} </p>
//       <p> Category: {this.props.category} </p>
//     </li>
