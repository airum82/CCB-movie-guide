import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ grabSearchTerms, getNewCategory, searchMovies }) => {
  return (
    <header>
      <div onClick={getNewCategory}>
        <NavLink to='/now_playing' id="now_playing">Now Playing</NavLink>
        <NavLink to='/popular' id="popular">Popular</NavLink>
        <NavLink to='/top_rated' id="top_rated">Top Rated</NavLink>
      </div>
      <form onSubmit={searchMovies}>
        <select>
          <option value="title">title</option>
          <option value='genre'>genre</option>
          <option value='description'>description</option>
        </select>
        <input type="text" name="search" onChange={grabSearchTerms}/>
        <button>search</button>
      </form>
    </header>
  )
}

export default Header;