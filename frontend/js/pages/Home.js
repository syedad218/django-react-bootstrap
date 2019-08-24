import React, { Component } from 'react';
import Header from '../app/example-app/components/headers';
import Dashboard from '../app/example-app/components/Dashboard';
import Alerts from '../app/example-app/components/Alerts';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

class Home extends Component {
  render() {
    return (
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Header />
        <Alerts />
        <div className="container">
          <Dashboard />
        </div>
      </AlertProvider>
    );
  }
}

export default Home;
