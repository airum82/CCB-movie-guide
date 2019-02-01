import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css';

const Movie = ({ movie, formatDate, viewMovie, location }) => {
  const singleView = location.pathname === `/movie/${movie.id}`;
  return (
      <article 
        className={ singleView ? 'movie-single' : 'movie'} 
        onClick={() => {
          viewMovie(movie.id)
        }}
      >
        <h2>{movie.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        { singleView ?
          <div className="movie-details">
            <p className="movie-description">{movie.overview}</p>
            <p className="movie-stats">Release Date: {formatDate(movie.release_date)}</p>
            <p className="movie-stats">Voter Average: {movie.vote_average}</p>
          </div> : ''
        
           }
      </article>
  )
}

Movie.propTypes = {
  movie: PropTypes.object,
  formatDate: PropTypes.func,
  viewMovie: PropTypes.func,
  location: PropTypes.object
}

export default Movie;