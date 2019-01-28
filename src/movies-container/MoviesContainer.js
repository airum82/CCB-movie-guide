import React from 'react';
import Movie from '../movie/Movie';
import './movie-container.css'

const MovieContainer = ({ movies, viewMovie, location, formatReleaseDate }) => {
  return (
    <section className={ movies.length === 1 ? 'movie-container-single' : 'movie-container'}>
      { movies.map((movie, i) => (
          <Movie 
            key={i} 
            movie={movie}
            viewMovie={viewMovie}
            location={location}
            formatReleaseDate={formatReleaseDate}
          />
      )) }
    </section>
  )
}

export default MovieContainer;