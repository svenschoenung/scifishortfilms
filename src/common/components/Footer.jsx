import React from 'react';
import { Link } from 'react-router';

export default function Footer(props) {
  var footer = {
    background: 'black',
    color: 'white',
    padding: '20px',
    fontFamily: 'Futura',
    fontWeight: '0px',
    fontSize: '20px'
  };
  return (
    <footer style={footer}>
      <ul>
        <li><Link to="/reviews">REVIEWS</Link></li>
        <li>FEATURES</li>
        <li>NEWS</li>
        <li>FILMS</li>
      </ul>
    </footer>
  );
}