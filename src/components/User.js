import React, { Component } from 'react';

class User extends Component {
  parseJSON = (response) => {
    return response.json();
  }
  state = {
    user: {},
    subscriptions: [],
    trials: []
  }


  getUser = (userID) => {
    fetch(`http://localhost:8080/api/users/${userID}`, {
      accept: 'application/json',
    }).then(this.parseJSON).then( (response) => {
      this.setState({user: response.user});
      this.setState({subscriptions: this.state.user.subscriptions});
      this.setState({trials: this.state.user.trials})
    }).catch(function(err) {
      console.log(err);
    });
  }

  render() {
    // this.getUser('587d6881b31a3bba36e908fc');
    console.log(this.state.subscriptions);

    return (
      <div className="welcome">
        <button onClick={() => this.getUser('587d6881b31a3bba36e908fc')}> Get User </button>
        <h2> Hello, {this.state.user.name}</h2>
        <h4> Subscription 1 </h4>
        <h5> Name: {this.state.subscriptions.length !== 0 ? this.state.subscriptions[0].name : "Add a Subscription!"} </h5>
        <p> Cost: ${this.state.subscriptions.length !== 0 ? this.state.subscriptions[0].cost/100 : "Add a Subscription!"} </p>

      </div>
    );
  }
}

// 587d6881b31a3bba36e908fc

export default User;
// .then(response => {return response.json()});


// <ul>
// { this.state.subscriptions.map({
//   <li>
//     <h5> {this.state.subscriptions[i].name} </h5>
//     <p> {this.state.subscriptions[i].cost} </p>
//     <p> {this.state.subscriptions[i].name} </p>
//     <p> {this.state.subscriptions[i].name} </p>
//
//   </li>
// })
// }
// <p> Cost: {this.state.subscriptions !== [] ? this.state.subscriptions[0].cost} </p>

// <h5> Name: {this.state.subscriptions[0].name} </h5>
// <p> Cost: {this.state.subscriptions[0].cost} </p>
