import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './App.css';

const App = (props) => {
  return (
    <div className={styles.app}>
      <Header/>
      {props.children}
      <Footer/>
    </div>
  );
};

export default withStyles(styles)(App);