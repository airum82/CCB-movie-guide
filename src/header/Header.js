import React from 'react';

const Header = props => {
  return (
    <header>
      <div>
        <p>Now Playing</p>
        <p>Popular</p>
        <p>Top Rated</p>
      </div>
      <div>
        <input type="text" name="search"/>
      </div>
    </header>
  )
}

export default Header;