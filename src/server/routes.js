import express from 'express';

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createRoutes, match, RouterContext } from 'react-router';

import AppRoutes from '../common/AppRoutes.jsx';
import Index from './templates/Index.jsx';

import config from './config/config.js';

const server = express();

server.get('*', (req, res) => {
  const handler = (error, redirect, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search)
    } else if (renderProps) {
      const app = renderToString(<RouterContext {...renderProps} />);
      const index = renderToStaticMarkup(
        <Index app={app} config={config}/>
      );

      res.status(200).send('<!DOCTYPE html>' + index)
    } else {
      res.status(404).send('Not found')
    }
  };

  match({ routes: AppRoutes, location: req.url }, handler);
});

server.listen(config.port, function(err) {
  if (err) {
    console.err(err);
    return;
  }
  console.log(`Started on port ${config.port}`);
});
