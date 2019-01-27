import React from 'react';
import Movie from '../movie/Movie';
import './movie-container.css'

const MovieContainer = ({ movies, viewMovie, location }) => {
  return (
    <section className='movie-container'>
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