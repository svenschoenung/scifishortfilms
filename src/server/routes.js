import express from 'express';

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createRoutes, match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import AppRoutes from '../common/AppRoutes.jsx';
import Index from './templates/Index.jsx';

import config from './config/config.js';
import reducers from '../common/store/reducers.js';

const renderErrorPage = (error, req, res) => {
   res.status(500).send(error.message)
};

const renderRedirect = (redirect, req, res) => {
   res.redirect(302, redirect.pathname + redirect.search)
};



const server = express();

server.use((req, res) => {
  const handler = (error, redirect, renderProps) => {
    if (error) {
      renderErrorPage(error, req, res);
    } else if (redirect) {
      renderRedirect(redirect, req, res);
    } else if (renderProps) {
      try {
        const store = createStore(reducers, {});
        const app = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const head = Helmet.rewind();
        const state = store.getState();
        const index = renderToStaticMarkup(
          <Index app={app} config={config} head={head} state={state}/>
        );
        res.status(200).send('<!DOCTYPE html>' + index)

      } catch (e) {
        Helmet.rewind(); //prevent possible memory leak
      }
    } else {
      res.status(404).send('Not found')
    }
  };

  match({ routes: AppRoutes, location: req.url }, handler);
});

server.listen(config.port, (err) => {
  if (err) {
    console.err(err);
    return;
  }
  console.log(`Started on port ${config.port}`);
});
