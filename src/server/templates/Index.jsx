import React from 'react';

const toJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

export default function Index({app, manifest, head, state, css}) {
  var script = `
    window.__MANIFEST__ = ${toJson(manifest())};
    window.__STORE__ = ${toJson(state)};
    (function() {
      var script = document.createElement('script');
      script.setAttribute('src', '/${manifest("app.js")}');
      document.getElementsByTagName('head')[0].appendChild(script);
    })();
  `;
  var style = `
    @font-face {
      font-family: 'Futura';
      src: url('${manifest("fonts/futura.ttf")}') format('truetype');
    }
    body { background-color: #f2f2f2; }
    * { margin: 0px; padding: 0px; }
  `;
 
  return (
    <html>
    <head>
      {head.title.toComponent()}
      <style dangerouslySetInnerHTML={{__html:style}}/>
      <style dangerouslySetInnerHTML={{__html:[...css].join('')}}/>
      <link rel="stylesheet" href={'/' + manifest("app.css")} />
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{__html:app}}/>
      <script dangerouslySetInnerHTML={{__html:script}}/>
    </body>
    </html>
  );
}
