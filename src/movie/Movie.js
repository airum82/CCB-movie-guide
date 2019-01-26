import React from 'react';

const Movie = props => {
  return (
      <article onClick={() => {
        props.viewMovie(props.movie.id)
      }}>
        <h2>{props.movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} />
      </article>
  )
}

export default Movie;