import React, { Component } from 'react';
import SubscriptionContainer from './Subscriptions/SubscriptionContainer';
import TrialContainer from './Subscriptions/TrialContainer';
import {Link} from 'react-router';


class Home extends Component {
  constructor(props) {
    super(props);
    this.userID = props.params.user_id;
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
      this.getUser(this.userID)
    }
  }

  sendSubscriptions() {
    if (this.state.user.name !== undefined && this.state.user.subscriptions.length !== 0) {
        var path=`/home/${this.userID}/subscriptions`
        return <Link {...this.props} to={path} activeClassName="active"> Subscriptions </Link>
        //  <SubscriptionContainer subscriptionList={this.state.user.subscriptions} />
    }
  }

  sendTrials() {
    if (this.state.user.name !== undefined && this.state.user.trials.length !== 0) {
      var path=`/home/${this.userID}/trials`
      return  <Link {...this.props} to={path} activeClassName="active"> Trials </Link>
        // return <TrialContainer trialList={this.state.user.trials} />
    }
  }

  sendChildren() {
    if (this.state.user.name !== undefined && this.state.user.subscriptions.length !== 0 && this.state.user.trials.length !== 0) {
      var childrenWithProps = React.cloneElement(this.props.children, {subscriptions: this.state.user.subscriptions, trials: this.state.user.trials});
      // console.log(childrenWithProps);
      return childrenWithProps
    }
  }


  render() {
    this.checkUser();

    return (
      <div className="Home">
        <h1> Welcome, {this.state.user.name} </h1>
        {this.sendSubscriptions()}
        {this.sendTrials()}

        { this.sendChildren() }
      </div>
    );
  }
}


// var childrenWithProps = React.cloneElement(this.props.children, {someProp: this.state.someProp});









// <NavLink to="/courses/html">HTML</NavLink>
// <Link to= activeClassName="active" />


// <div className="main-content courses">
//   <div className="course-header group">
//     <h2>Courses</h2>
//     <ul className="course-nav">
//       <li><NavLink to="/courses/html">HTML</NavLink></li>
//       <li><NavLink to="/courses/css">CSS</NavLink></li>
//       <li><NavLink to="/courses/javascript">JavaScript</NavLink></li>
//     </ul>
//   </div>
//   { this.props.children }
// </div>


export default Home;
