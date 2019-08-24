import React from 'react';
import { hot } from 'react-hot-loader';
import Home from './pages/Home';
import SentryBoundary from './utils/SentryBoundary';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <SentryBoundary>
    <Provider store={store}>
      <Home />
    </Provider>
  </SentryBoundary>
);

export default hot(module)(App);
