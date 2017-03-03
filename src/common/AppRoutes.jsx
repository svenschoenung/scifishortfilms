import React from 'react';

import { Route, IndexRoute, IndexLink, Link } from 'react-router';

import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';

const AppRoutes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
  </Route>
);

export default AppRoutes;
