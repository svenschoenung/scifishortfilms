import React from 'react';

export default function Header() {
  var logo = {
    width: '100%',
  };
  return (
    <header>
    <h1><img style={logo} alt="Sci-fi Short films" 
             src="/imgs/scifishortfilms.svg" /></h1>
    </header>
  );
}
