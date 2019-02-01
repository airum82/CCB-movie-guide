import React from 'react';
import PropTypes from 'prop-types';
import Movie from '../movie/Movie';
import './movie-container.css';

const MovieContainer = ({ movies, viewMovie, location, formatDate }) => (
    <section className={ location.pathname.includes('movie') ? 'movie-container-single' : 'movie-container'}>
      { movies.map((movie, i) => (
          <Movie
            key={i} 
            movie={movie}
            viewMovie={viewMovie}
            location={location}
            formatDate={formatDate}
          />
      )) }
    </section>
);

MovieContainer.propTypes = {
  movies: PropTypes.array,
  viewMovie: PropTypes.func,
  location: PropTypes.object,
  formatDate: PropTypes.func,
};

export default MovieContainer;
