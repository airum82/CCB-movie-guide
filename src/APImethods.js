
export const getMoviesByCategory = (category, page = 1) => fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.APIkey}&language=en-US&page=${page}`)
  .then(response => response.json())
  .catch(err => console.log(err));

export const getMovieDetails = movieId => fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.APIkey}&language=en-US`)
  .then(response => response.json())
  .catch(err => console.log(err));
