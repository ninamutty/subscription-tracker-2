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



// redo routes so user_id is before dashboard and charts

// Routes
const routes = (
  <Router history={browserHistory}>
    <Route component={App} >
      <Route path="/subscription-tracker-2/" component={Verify} />

      <Route path="/subscription-tracker-2/home/:user_id" component={Home}>
        <IndexRedirect to="dashboard" />
        <Route path="charts" component={ChartPage} />
        <Route path="dashboard" component={DashBoard} >
          <Route path="form" component={Form} />
        </Route>
      </Route>

      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default routes;
