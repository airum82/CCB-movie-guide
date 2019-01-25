import { APIkey } from './APIkey';

export const getMoviesByCategory = category => {
  return fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${APIkey}&language=en-US`)
    .then(response => response.json())
    .catch(err => console.log(err))
}