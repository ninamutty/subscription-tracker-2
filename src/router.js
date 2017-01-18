// Libs
import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

// Components
import App from './App';
import Home from './components/Home';
import NotFound from './components/NotFound';


// Routes
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
);

export default routes;
// <Route component={App}>
//   <Route path="/" component={Home} />
//   <Route path="*" component={NotFound} />
// </Route>
