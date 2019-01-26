import React from 'react';
import Movie from '../movie/Movie';

const MovieContainer = ({ movies, viewMovie }) => {
  return (
    <section>
      { movies.map((movie, i) => (
          <Movie 
            key={i} 
            movie={movie}
            viewMovie={viewMovie}
          />
      )) }
    </section>
  )
}

export default MovieContainer;