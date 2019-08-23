import React, { Component } from 'react';
import Header from '../app/example-app/components/headers';
import Dashboard from '../app/example-app/components/Dashboard';
class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <Dashboard />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
