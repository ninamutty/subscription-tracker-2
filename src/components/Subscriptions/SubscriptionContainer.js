import React, { Component } from 'react';
import Subscription from './Subscription';

class SubscriptionContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props);
    let subscriptionList = this.props.subscriptions;
    let subscriptions = subscriptionList.map((subscription) => {
      return <Subscription name={subscription.name}
                     cost={subscription.cost}
                     category={subscription.category}
                     id={subscription._id}
                     key={subscription._id}
                     onClick={this.props.onClick}
                     setSelectState={this.props.setSelectState} />
    });
    return (
      <div className="all-subscriptions-container">
        <h2> Subscriptions </h2>
        <div className="scroll-container" data-equalize>
          <ul className="subscription-container" data-equalizer="foo">
            {subscriptions}
          </ul>
        </div>
      </div>
    );
  }
}

export default SubscriptionContainer;
