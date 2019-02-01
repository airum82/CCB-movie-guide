/* eslint-disable */
import * as Utils from './utils';

describe('Utils methods', () => {
  
  it('formatDate should format a dateStr to american standards', () => {
    const rawDate = '2019-01-15'
    const expectedResult = '01-15-2019'
    const result = Utils.formatDate(rawDate)
    expect(result).toEqual(expectedResult)
  })

  it('sortMovies should take in an array of movies and return them sorted by title', () => {
    const movies = [{ title: 'Canteberry tales' }, { title: 'before the first' }, { title: 'A first title' }]
    const expectedResult = [
      { title: 'A first title' },
      { title: 'before the first' },
      { title: 'Canteberry tales' }
    ];
    const result = Utils.sortMovies(movies);
    expect(result).toEqual(expectedResult);
  })

  it('formatResults should take in an array of movies and return an array of those that match searchTerms by title', () => { 
      const movies = [
        { title: 'Robin' }, 
        { title: 'Batman' }, 
        { title: 'Robinson' },
        { title: 'Parent Trap' }, 
        { title: 'Robbery' }
      ];
      const expectedResult = [
        { title: 'Robin' },
        { title: 'Robinson' },
        { title: 'Robbery' }
      ];
      const searchTerms = 'rob';
      const result = Utils.formatResults(movies, searchTerms);
      expect(result).toEqual(expectedResult);
  })

  it('normalize should take in a str and return it lower case', () => {
    const str = 'I AM Upper CASE';
    const expectedResult = 'i am upper case';
    const result = Utils.normalize(str);
    expect(result).toEqual(expectedResult);
  })
})