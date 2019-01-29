import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ grabSearchTerms, getNewCategory, searchMovies, location, searchTerms }) => {
  return (
    <header className="header">
      <div onClick={getNewCategory} className="header-nav">
        <NavLink 
          to='/now_playing' 
          id="now_playing" 
          className={ location.pathname === '/now_playing' ? 'current-category' : ''}
        >
          Now Playing
        </NavLink>
        <NavLink
          to='/popular' 
          id="popular" 
          className={ location.pathname === '/popular' ? 'current-category nav-spacing' : 'nav-spacing' }
        >
          Popular
        </NavLink>
        <NavLink 
          to='/top_rated' 
          id="top_rated" 
          className={location.pathname === '/top_rated' ? 'current-category' : ''}
        >
          Top Rated
        </NavLink>
      </div>
      <form className="header-search" onSubmit={searchMovies}>
        <input value={searchTerms} type="text" name="search" onChange={grabSearchTerms}/>
        <button>search</button>
      </form>
    </header>
  )
}

Header.propTypes = {
  grabSearchTerms: PropTypes.func,
  getNewCategory: PropTypes.func,
  searchMovies: PropTypes.func,
  location: PropTypes.object,
  searchTerms: PropTypes.string
}

export default Header;