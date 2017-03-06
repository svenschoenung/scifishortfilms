import React from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Footer.css';

const Footer = (props) => {
  return (
    <footer className={styles.websiteFooter}>
      <ul className={styles.websiteSections}>
        <li><Link to="/reviews">REVIEWS</Link></li>
        <li><Link to="/features">FEATURES</Link></li>
        <li><Link to="/news">NEWS</Link></li>
        <li><Link to="/films">FILMS</Link></li>
      </ul>
    </footer>
  );
};

export default withStyles(styles)(Footer);