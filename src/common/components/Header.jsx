import React from 'react';

export default function Header(props, context) {
  var heading = {
    margin: '20px'
  };
  var logo = {
    width: '100%'
  };

  return (
    <header>
      <h1 style={heading}>
      <img style={logo} alt="Sci-fi Short films" 
           src={'/imgs/' + context.manifest('scifishortfilms.svg')} />
      </h1>
    </header>
  );
}

Header.contextTypes = {
  manifest: React.PropTypes.func
};
