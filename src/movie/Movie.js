import React from 'react';

const Movie = props => {
  return (
    <article>
      <h2>{props.movie.title}</h2>
    </article>
  )
}

export default Movie;