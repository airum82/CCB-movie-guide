export const sortMovies = (movies) => {
  return movies.sort((a, b) => {
    const aTitle = a.title.toUpperCase();
    const bTitle = b.title.toUpperCase();
    if (aTitle > bTitle) return 1;
    if (aTitle < bTitle) return -1;
    return 0;
  });
};

export const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${month}-${day}-${year}`;
};

export const formatResults = (arr, searchTerms) => {
  return arr.reduce((results, movie) => {
    if (movie.title.toLowerCase().includes(searchTerms)) {
      const duplicate = results.find(result =>
        result.title.toLowerCase() === movie.title.toLowerCase());
      if (!duplicate) results.push(movie);
    }
    return results;
  }, []);
};

export const normalize = str => str.toLowerCase();
