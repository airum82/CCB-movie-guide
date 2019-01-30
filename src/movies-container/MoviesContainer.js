import React from 'react';
import Movie from '../movie/Movie';
import PropTypes from 'prop-types';
import './movie-container.css'

const MovieContainer = ({ movies, viewMovie, location, formatReleaseDate }) => {
  return (
    <section className={ location.pathname.includes('movie') ? 'movie-container-single' : 'movie-container'}>
      { movies.map((movie, i) => (
          <Movie 
            key={i} 
            movie={movie}
            viewMovie={viewMovie}
            location={location}
            formatReleaseDate={formatReleaseDate}
          />
      )) }
    </section>
  )
}

MovieContainer.propTypes = {
  movies: PropTypes.array,
  viewMovie: PropTypes.func,
  location: PropTypes.object,
  formatReleaseDate: PropTypes.func
}

export default MovieContainer;