import express from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

import App from '../common/components/App.jsx';
import Index from './templates/Index.jsx';
import config from './config/config.js';

const server= express();

server.get('/', (req, res) => {
  const app = renderToString(<App />);
  const index = renderToStaticMarkup(
    <Index app={app} config={config}/>
  );

  res.send('<!DOCTYPE html>' + index);
});

server.listen(config.port, function(err) {
  if (err) {
    console.err(err);
    return;
  }
  console.log(`Started on port ${config.port}`);
});
