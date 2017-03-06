import React from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Header.css';

const Header = (props, context) => {
 return (
    <header className={styles.websiteHeader}>
      <h1>
      <Link to="/">
      <img alt="Sci-fi Short films" 
           src={'/imgs/' + context.manifest('scifishortfilms.svg')} />
      </Link>
      </h1>
    </header>
  );
};

Header.contextTypes = {
  manifest: React.PropTypes.func
};

export default withStyles(styles)(Header);