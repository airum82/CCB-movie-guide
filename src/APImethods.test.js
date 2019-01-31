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
})