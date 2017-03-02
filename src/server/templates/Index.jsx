import React from 'react';

export default class Index extends React.Component {
  render() {
    return (
      <html>
      <head>
        <title>App</title>
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html:this.props.app}}></div>
        <script src={'/' + this.props.config.bundle}></script>
      </body>
      </html>
    );
  }
}
