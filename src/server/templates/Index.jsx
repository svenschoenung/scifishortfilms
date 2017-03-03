import React from 'react';

export default function Index({app, config}) {
  var script = `
    (function() {
      var script = document.createElement('script');
      script.setAttribute('src', '/${config.bundle}');
      document.getElementsByTagName('head')[0].appendChild(script);
    })();
  `;
  
  return (
    <html>
    <head>
      <title>App</title>
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{__html:app}}></div>
      <script dangerouslySetInnerHTML={{__html:script}}>
      </script>
    </body>
    </html>
  );
}
