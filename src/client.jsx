import React from 'react';
import ReactDom from 'react-dom';

import AppRouter from './client/AppRouter.jsx';

require('./client/imgs/scifishortfilms.svg');
 
ReactDom.render(<AppRouter/>, document.getElementById('app'));
