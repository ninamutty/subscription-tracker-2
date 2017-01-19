import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.userID = props.params.user_id;
    console.log(this.userID);
    this.state = {user: {}}
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
      return this.getUser(this.userID)
    }
  }

  mapSubscriptions() {
    let subscriptions = this.state.user.subscriptions;
    let subscriptionList = subscriptions
  }

  render() {
    return (
      <div className="Home">
        { this.checkUser() }
        <h1> Welcome, {this.state.user.name} </h1>
      </div>
    );
  }
}

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
