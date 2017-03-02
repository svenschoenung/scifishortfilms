import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../common/components/App.jsx';
import config from './config/config.js';

const app = express();

app.get('/', (req, res) => {
  const reactRoot = renderToString(<App />);

  res.send(`<!DOCTYPE html>
    <html>
      <head>
        <title>App</title>
      </head>
      
      <body>
        <div id="app">${reactRoot}</div>
        <script src="/${config.bundle}"></script>
      </body>
    </html>
  `);
});

app.listen(config.port, function(err) {
  if (err) {
    console.err(err);
    return;
  }
  console.log(`Started on port ${config.port}`);
});
