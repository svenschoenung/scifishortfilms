import React from 'react';

const toJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

export default function Index({app, manifest, head, state}) {
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
    * {
      margin: 0px;
      padding: 0px;
    }
    body {
      background-color: #f2f2f2;
    }
  `;
 
  return (
    <html>
    <head>
      {head.title.toComponent()}
      <style dangerouslySetInnerHTML={{__html:style}}/>
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{__html:app}}/>
      <script dangerouslySetInnerHTML={{__html:script}}/>
    </body>
    </html>
  );
}
