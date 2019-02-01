import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';
import * as API from '../APImethods';

describe('App', () => {
  let wrapper;
  const mockProps = {
    history: {
      push: jest.fn()
    },
    location: {
      pathname: '/'
    }
  }
  beforeEach(() => {
    wrapper = shallow(<App {...mockProps} />, {
      disableLifecycleMethods: true
    })
  })

  it('should match snapshot upon render', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('grab search terms should set state with lower case string', () => {
    const mockEvent = {
      target: {
        value: 'Rob'
      }
    };
    const expectedResult = mockEvent.target.value.toLowerCase();
    expect(wrapper.state('searchTerms')).toEqual('');
    wrapper.instance().grabSearchTerms(mockEvent);
    expect(wrapper.state('searchTerms')).toEqual(expectedResult);
  })

  it('searchMovies should call API.getMoviesByCategory and createResults', () => {
    API.getMoviesByCategory = jest.fn().mockImplementation(() => Promise.resolve({
      results: [{ title: 'first' }, { title: 'second' }]
    }));
    wrapper.instance().createResults = jest.fn();
    const mockEvent = {
      preventDefault: jest.fn()
    }
    wrapper.instance().searchMovies(mockEvent);
    Promise.resolve({}).then(() => {
      expect(API.getMoviesByCategory).toHaveBeenCalled()
    }).then(() => {
      expect(wrapper.instance().createResults).toHaveBeenCalled()
    })
  })

  it('searchMovies should not call API.getMoviesByCategory if all categories are fetched', () => {
    wrapper.instance().setState({
      now_playing: [{ title: 'now' }, { title: 'playing' }],
      popular: [{ title: 'super' }, { title: 'popular' }],
      top_rated: [{ title: 'top' }, { title: 'rated' }]
    })
    API.getMoviesByCategory = jest.fn().mockImplementation(() => Promise.resolve({
      results: [{ title: 'first' }, { title: 'second' }]
    }));
    const mockEvent = {
      preventDefault: jest.fn()
    }
    wrapper.instance().searchMovies(mockEvent);
    expect(API.getMoviesByCategory).not.toHaveBeenCalled();
  })

  it('searchMovies should call history.push with correct params', () => {
    API.getMoviesByCategory = jest.fn().mockImplementation(() => Promise.resolve({
      results: [{ title: 'first' }, { title: 'second' }]
    }));
    const mockEvent = {
      preventDefault: jest.fn()
    };
    Promise.resolve({})
      .then(() => wrapper.instance().searchMovies(mockEvent))
      .then(() => {
        expect(mockProps.history.push).toHaveBeenCalledWith('/searchResults');
      })
      .catch(err => console.log(err.message));
  })

  it('createResults should setState with results that match search terms', () => {
    wrapper.instance().setState({
      now_playing: [{ title: 'Robin' }, { title: 'Batman'}, { title: 'Robinson'}],
      popular: [{ title: 'Parent Trap'}, { title: 'Robbery'}]
    });
    const expectedResult = [
      { title: 'Robin' }, 
      { title: 'Robinson' }, 
      { title: 'Robbery' }
    ]
    wrapper.instance().setState({ searchTerms: 'rob' })
    wrapper.instance().createResults();
    expect(wrapper.state('searchResults')).toEqual(expectedResult);
  })

  //test get new category later
  it('getNewCategory should call API.getMoviesByCategory', () => {
    API.getMoviesByCategory = jest.fn().mockImplementation(() => Promise.resolve({
      results: []
    }));
    const mockEvent = {
      target: {
        id: 'popular'
      }
    }
    wrapper.instance().getNewCategory(mockEvent)
    expect(API.getMoviesByCategory).toHaveBeenCalledWith(mockEvent.target.id)
  })

  it('getNewCategory should call sortMovies if new category is fetched then set state with sortedmovies', () => {
    API.getMoviesByCategory = jest.fn().mockImplementation(() => Promise.resolve({
      results: [{ title: 'uno' }, { title: 'dos' }]
    }));
    const mockEvent = {
      target: {
        id: 'popular'
      }
    };
    wrapper.instance().setState = jest.fn();
    wrapper.instance().sortMovies = jest.fn().mockImplementation(() => {
      return [{ title: 'uno' }, { title: 'dos' }];
    });
    Promise.resolve({})
      .then(() => wrapper.instance().getNewCategory(mockEvent))
      .then(() => {
        expect(wrapper.instance().sortMovies).toHaveBeenCalledWith({
          results: [{ title: 'uno' }, { title: 'dos' }]
        })
      })
      .then(() => {
        expect(wrapper.instance().setState).toHaveBeenCalledWith({
          popular: [{ title: 'uno' }, { title: 'dos' }]
        })
      })
      .catch(err => console.log(err.message))
  })

  it('getNewCategory should not call API.getMoviesByCategory if category is already fetched', () => {
    API.getMoviesByCategory = jest.fn().mockImplementation(() => Promise.resolve({
      results: [{ title: 'more popular'}, { title: 'than you'}]
    }));
    wrapper.instance().setState({
      popular: [{ title: 'you\'re a title'}, { title: 'no you are'}]
    })
    const mockEvent = {
      target: {
        id: 'popular'
      }
    };
    wrapper.instance().getNewCategory(mockEvent);
    expect(API.getMoviesByCategory).not.toHaveBeenCalled();
  })
  
  it('viewMovie should call API.getMovieDetails', () => {
    API.getMovieDetails = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({})
    }));
    const id = '549'
    wrapper.instance().viewMovie(id);
    expect(API.getMovieDetails).toHaveBeenCalledWith(id);

  })

  it('componentDidMount should call API.getMoviesByCateogry, sortMovies then setState with sortedMovies', () => {
    API.getMoviesByCategory = jest.fn().mockImplementation(() => Promise.resolve({
      results: [{ title: 'title'}, { title: 'why'}]
    }))
    wrapper = shallow(<App {...mockProps} />, {
      disableLifecycleMethods: false
    });
    wrapper.instance().setState = jest.fn();
    wrapper.instance().sortMovies = jest.fn().mockImplementation((movies) => {
      return movies.results
    })
    Promise.resolve({})
      .then(() => {
        expect(API.getMoviesByCategory).toHaveBeenCalledWith('now_playing')
      })
      .then(() => {
        expect(wrapper.instance().sortMovies).toHaveBeenCalledWith({
          results: [{ title: 'title' }, { title: 'why' }]
        })
      })
      .then(() => {
        expect(wrapper.instance().setState).toHaveBeenCalledWith({
          now_playing: [{ title: 'title' }, { title: 'why' }]
        })
      })
      .then(() => {
        expect(mockProps.history.push).toHaveBeenCalledWith('/now_playing');
      })
      .catch(err => console.log(err.message))
  })
})
