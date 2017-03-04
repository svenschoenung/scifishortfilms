import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import ManifestProvider from '../common/ManifestProvider.jsx';
import AppRoutes from '../common/AppRoutes.jsx';

import store from './store.js';
import manifest from './manifest.js';

export default function AppRouter() {
  return (
    <ManifestProvider manifest={manifest}>
      <Provider store={store}>
        <Router routes={AppRoutes} history={browserHistory}/>
      </Provider>
    </ManifestProvider>
  );
}
