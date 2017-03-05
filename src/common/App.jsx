import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
      <Header/>
      {this.props.children}
      <Footer/>
      </div>
    );
  }
}
