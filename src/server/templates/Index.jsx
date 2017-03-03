import React from 'react';

export default function Index({app, config, head, state}) {
  var script = `
    window.__STORE_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')};
    (function() {
      var script = document.createElement('script');
      script.setAttribute('src', '/${config.bundle}');
      document.getElementsByTagName('head')[0].appendChild(script);
    })();
  `;
 
  return (
    <html>
    <head>
      {head.title.toComponent()}
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{__html:app}}/>
      <script dangerouslySetInnerHTML={{__html:script}}/>
    </body>
    </html>
  );
}
