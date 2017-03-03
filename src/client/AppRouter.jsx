import React from 'react';
import { Router, browserHistory } from 'react-router';

import AppRoutes from '../common/AppRoutes.jsx';

export default function AppRouter() {
  return (
    <Router routes={AppRoutes} history={browserHistory}/>
  );
}
