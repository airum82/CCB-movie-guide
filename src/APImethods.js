import { APIkey } from './APIkey';

export const getNowPlaying = () => {
  return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIkey}&language=en-US`)
    .then(response => response.json())
    .catch(err => console.log(err))
}