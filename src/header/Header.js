import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = ({ grabSearchTerms, getNewCategory, searchMovies }) => {
  return (
    <header className="header">
      <div onClick={getNewCategory} className="header-nav">
        <NavLink to='/now_playing' id="now_playing">Now Playing</NavLink>
        <NavLink to='/popular' id="popular">Popular</NavLink>
        <NavLink to='/top_rated' id="top_rated">Top Rated</NavLink>
      </div>
      <form onSubmit={searchMovies}>
        <input type="text" name="search" onChange={grabSearchTerms}/>
        <button>search</button>
      </form>
    </header>
  )
}

export default Header;