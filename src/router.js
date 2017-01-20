// Libs
import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

// Components
import App from './App';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Verify from './components/Verify';
import Form from './components/Form';


// Routes
const routes = (
  <Router history={browserHistory}>
    <Route component={App} >
      <Route path="/" component={Verify} />

      <Route path="home/:user_id" component={Home} >
        <Route path="form" component={Form} title="Form" />
      </Route>

      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default routes;

// subscriptionList={Home.state.user.subscriptions}

// <IndexRedirect to="subscriptions" />
// <Route path="subscriptions" component={SubscriptionContainer}  />
// <Route path="trials" component={TrialContainer} />
// <Route path=":subscription_id" component={SubscriptionDetails} />
// </Route>
