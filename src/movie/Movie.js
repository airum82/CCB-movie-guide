import React from 'react';
import './Movie.css';

const Movie = props => {
  const singleView = location.pathname === `/movie/${props.movie.id}`;
  return (
      <article 
        className={ singleView ? 'movie-single' : 'movie'} 
        onClick={() => {
        props.viewMovie(props.movie.id)
        }}
      >
        <h2>{props.movie.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} />
        { singleView ?
          <div>
            <p>{props.movie.overview}</p>
            <p className="movie-stats">Release Date: {props.formatReleaseDate(props.movie.release_date)}</p>
            <p className="movie-stats">Voter Average: {props.movie.vote_average}</p>
          </div> : ''
        
           }
      </article>
  )
}

export default Movie;