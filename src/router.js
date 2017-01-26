// Libs
import React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

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
  <Router history={hashHistory}>
    <Route component={App} >
      <Route path="/subscription-tracker-2/" component={Verify} />

      <Route path="/subscription-tracker-2/home/:user_id" component={Home}>
        <IndexRedirect to="/subscription-tracker-2/dashboard" />
        <Route path="/subscription-tracker-2/charts" component={ChartPage} />
        <Route path="/subscription-tracker-2/dashboard" component={DashBoard} >
          <Route path="/subscription-tracker-2/form" component={Form} />
        </Route>
      </Route>

      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default routes;
