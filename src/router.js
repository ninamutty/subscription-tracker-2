// Libs
import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

// Components
import App from './App';
import DashBoard from './components/DashBoard';
import NotFound from './components/NotFound';
import Verify from './components/Verify';
import Form from './components/Form';
import ChartPage from './components/ChartPage';
import Home from './components/Home';


// Routes
const routes = (
  <Router history={browserHistory}>
    <Route component={App} >
      <Route path="/" component={Verify} />

      <Route path="home/:user_id" component={Home}>
        <IndexRedirect to="home/:user_id/dashboard" />
        <Route path="home/:user_id/charts" component={ChartPage} />
        <Route path="home/:user_id/dashboard" component={DashBoard} >
          <Route path="home/:user_id/dashboard/form" component={Form} />
        </Route>
      </Route>

      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default routes;
