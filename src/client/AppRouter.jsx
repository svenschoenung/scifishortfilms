import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppRoutes from '../common/AppRoutes.jsx';
import reducers from '../common/store/reducers.js';

const state = window.__STORE_STATE__;
delete window.__STORE_STATE__;

const store = createStore(reducers, state);

export default function AppRouter() {
  return (
    <Provider store={store}>
      <Router routes={AppRoutes} history={browserHistory}/>
    </Provider>
  );
}
