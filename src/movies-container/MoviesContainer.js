import React from 'react';
import Movie from '../movie/Movie';

const MovieContainer = ({ movies }) => {
  return (
    <section>
      { movies.map((movie, i) => (
          <Movie key={i} movie={movie}/>
      )) }
    </section>
  )
}

export default MovieContainer;