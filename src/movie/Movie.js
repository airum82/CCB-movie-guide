import React from 'react';
import './Movie.css';

const Movie = props => {
  return (
      <article className='movie' onClick={() => {
        props.viewMovie(props.movie.id)
      }}>
        <h2>{props.movie.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} />
        { location.pathname === `/movie/${props.movie.id}` ?
          <div>
            <p>{props.movie.overview}</p>
            <p>{props.movie.release_date}</p>
            <p>{props.movie.vote_average}</p>
          </div> : ''
        
           }
      </article>
  )
}

export default Movie;