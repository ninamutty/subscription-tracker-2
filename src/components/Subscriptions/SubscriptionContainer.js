import React, { Component } from 'react';
import Subscription from './Subscription';

class SubscriptionContainer extends Component {
  render() {
    let subscriptionList = this.props.subscriptionList;
    let subscriptions = subscriptionList.map((subscription) => {
      return <Subscription name={subscription.name}
                     cost={subscription.cost}
                     category={subscription.category}
                     key={subscription._id} />
    });
    return (
      <div>
        <h2> Subscriptions </h2>
        <ul className="subscription-container">
          {subscriptions}
        </ul>
      </div>
    );
  }
}

export default SubscriptionContainer;
