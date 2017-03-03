import React from 'react';
import Header from './components/Header.jsx';

export default class App extends React.Component {
  render() {
    var app = {
      borderTop: '5px solid black',
      maxWidth: '1000px',
      margin: '0px auto',
      background: 'white',
      boxShadow: '0px 0px 5px #888',
      padding: '20px'
    }
    return (
      <div style={app}>
      <Header/>
      {this.props.children}
      </div>
    );
  }
}
