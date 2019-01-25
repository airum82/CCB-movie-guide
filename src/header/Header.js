import React from 'react';

const Header = ({ searchMovies }) => {
  return (
    <header>
      <div>
        <p>Now Playing</p>
        <p>Popular</p>
        <p>Top Rated</p>
      </div>
      <div>
        <input type="text" name="search" onChange={searchMovies}/>
      </div>
    </header>
  )
}

export default Header;