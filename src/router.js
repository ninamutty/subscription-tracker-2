// Libs
import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

// Components
import App from './App';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Verify from './components/Verify';
import SubscriptionContainer from './components/Subscriptions/SubscriptionContainer';
import SubscriptionDetails from './components/Subscriptions/SubscriptionDetails';
import TrialContainer from './components/Subscriptions/TrialContainer';
import TrialDetails from './components/Subscriptions/TrialDetails';



// Routes
const routes = (
  <Router history={browserHistory}>
    <Route component={App} >
      <Route path="/" component={Verify} />
      <Route path="home/:user_id" component={Home} >
        <IndexRedirect to="subscriptions" />
        <Route path="subscriptions" component={SubscriptionContainer}  >
          <Route path=":subscription_id" component={SubscriptionDetails} />
        </Route>
        <Route path="trials" component={TrialContainer} >
          <Route path=":trial_id" component={TrialDetails} />
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default routes;

// subscriptionList={Home.state.user.subscriptions}
