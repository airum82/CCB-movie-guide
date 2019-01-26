import React from 'react';

const Movie = props => {
  return (
      <article onClick={() => {
        props.viewMovie(props.movie.id)
      }}>
        <h2>{props.movie.title}</h2>
      </article>
  )
}

export default Movie;