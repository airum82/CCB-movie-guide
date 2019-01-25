import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ searchMovies, getNewCategory }) => {
  return (
    <header>
      <div onClick={getNewCategory}>
        <NavLink to='/now_playing' id="now_playing">Now Playing</NavLink>
        <NavLink to='/popular' id="popular">Popular</NavLink>
        <NavLink to='/top_rated' id="top_rated">Top Rated</NavLink>
      </div>
      <div>
        <input type="text" name="search" onChange={searchMovies}/>
      </div>
    </header>
  )
}

export default Header;