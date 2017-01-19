import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.userID = props.params.user_id;
    console.log(this.userID);
    this.state = {user: {}, isFetching: true}
  }

  getUser(userID) {
    const BASE_URL = 'http://localhost:8080/'

    fetch(`${BASE_URL}api/users/${userID}`, {
      accept: 'application/json',
    }).then( (response) => {
      return response.json();
    }).then( (response) => {
      this.setState({user: response.user})
    }).catch(function(err) {
      console.log(err);
    });
  }

  checkUser() {
    if (this.state.user.name === undefined) {
      let user = this.getUser(this.userID)
    }
  }

  getSubscriptions() {
    if (this.state.user.subscriptions !== undefined) {
      let subscriptionList = this.state.user.subscriptions;
      console.log(this.state.user);
      let subscriptions = subscriptionList.map((subscription) => {
        return
          <li>
            <h3> { subscription.name } </h3>
            <p> Price: ${subscription.cost/100.00} </p>
            <p> Billing Cycle: ${subscription.billingCycle} </p>
            <p> Category: {subscription.category} </p>
          </li>
      })
    }
  }

  render() {
    return (
      <div className="Home">
        { this.checkUser() }
        <h1> Welcome, {this.state.user.name} </h1>
        <ul>
          { this.getSubscriptions()  }
        </ul>
      </div>
    );
  }
}

// render() {
//     let courseList = this.props.route.data;
//     let courses = courseList.map((course) => {
//       return <Course title={course.title}
//                      desc={course.description}
//                      img={course.img_src}
//                      key={course.id} />
//     });
//     return (
//       <div>
//         <ul>
//           {courses}
//         </ul>
//       </div>
//     );
//   }

export default Home;



// const Home = props => {
//   console.log(props);
//   console.log(props.params.user_id);
//
//   var userID = props.params.user_id ;
//
//   console.log(userID);
//   return (
//     <div className="Home">
//       <h1> WELCOME TO HOME </h1>
//       <p> {userID} </p>
//     </div>
//   );
// }
