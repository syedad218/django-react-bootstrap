import React, { Component, Fragment } from 'react';
import Header from '../app/example-app/components/headers';
import Dashboard from '../app/example-app/components/Dashboard';
import Alerts from '../app/example-app/components/Alerts';
import Login from '../app/example-app/components/Login';
import Register from '../app/example-app/components/Register';
import PrivateRoute from '../common/PrivateRoute';
import { loadUser } from '../actions/auth';
import store from '../store';
import { Provider as AlertProvider } from 'react-alert';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AlertTemplate from 'react-alert-template-basic';
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

class Home extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Header />
            <Alerts />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </AlertProvider>
    );
  }
}

export default Home;
