import * as API from './APImethods';
import { APIkey } from './APIkey';

describe('API methods', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        results: [{ title: 'a movie'}, { title: 'another one'}]
      })
    }))

  })
  it('getMoviesByCategory should call fetch', () => {
    const fakeUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US`
    API.getMoviesByCategory('popular');
    expect(window.fetch).toHaveBeenCalledWith(fakeUrl);
  })
  it('should return an object with movies', () => {
    const expectedResult = {
      results: [{ title: 'a movie' }, { title: 'another one' }]
    }
    API.getMoviesByCategory('popular')
      .then(movies => {
        expect(movies).toEqual(expectedResult)
      })
  })
  it('getMovieDetails should call window.fetch', () => {
    const movieId = '583'
    const fakeUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIkey}&language=en-US`;
    API.getMovieDetails(movieId);
    expect(window.fetch).toHaveBeenCalledWith(fakeUrl);
  })

  it('getMovieDetails should return a movie object', () => {
    const movieId = '583';
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        title: 'the parsening',
        release_date: 'right about now'
      })
    }))
    const expectedResult = {
      title: 'the parsening',
      release_date: 'right about now'
    }
    API.getMovieDetails(movieId)
      .then(movie => {
        expect(movie).toEqual(expectedResult);
      })
  })
})