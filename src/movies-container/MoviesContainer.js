import React from 'react';
import Movie from '../movie/Movie';

const MovieContainer = ({ movies, viewMovie, location }) => {
  return (
    <section>
      { movies.map((movie, i) => (
          <Movie 
            key={i} 
            movie={movie}
            viewMovie={viewMovie}
            location={location}
          />
      )) }
    </section>
  )
}

export default MovieContainer;