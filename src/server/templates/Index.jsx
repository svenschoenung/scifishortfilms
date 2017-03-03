import React from 'react';

export default function Index({app, config, head, state}) {
  var bundleScript = `
    (function() {
      var script = document.createElement('script');
      script.setAttribute('src', '/${config.bundle}');
      document.getElementsByTagName('head')[0].appendChild(script);
    })();
  `;
  var stateScript = `
    window.__STORE_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')};
  `;
  
  return (
    <html>
    <head>
      {head.title.toComponent()}
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{__html:app}}/>
      <script dangerouslySetInnerHTML={{__html:stateScript}}/>
      <script dangerouslySetInnerHTML={{__html:bundleScript}}/>
    </body>
    </html>
  );
}
