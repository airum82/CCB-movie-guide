/* eslint-disable */
import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';
import * as API from '../APImethods';
import * as Utils from '../utils';

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
    Utils.sortMovies = jest.fn().mockImplementation((movies) => {
      return movies
    });
    Promise.resolve({})
      .then(() => wrapper.instance().getNewCategory(mockEvent))
      .then(() => {
        expect(Utils.sortMovies).toHaveBeenCalledWith(
          [{ title: 'uno' }, { title: 'dos' }]
        )
      })
      .then(() => {
        expect(wrapper.state('popular')).toEqual(
          [{ title: 'uno' }, { title: 'dos' }]
        )
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
      title: 'water',
      description: 'some water'
    }));
    const id = '549'
    wrapper.instance().viewMovie(id);
    expect(API.getMovieDetails).toHaveBeenCalledWith(id);

  })

  it('grabMoreMovies should call getMoviesByCategory, then setState with sorted movies', () => {
    mockProps.location.pathname = '/now_playing';
    API.getMoviesByCategory = jest.fn().mockImplementation(() => Promise.resolve({
      results: [{ title: 'title' }, { title: 'why' }, { title: 'there\'s more'}]
    }));
    wrapper = shallow(<App {...mockProps} />,{
      disableLifecycleMethods: true
    })
    wrapper.instance().grabMoreMovies();
    Promise.resolve({})
      .then(() => {
        expect(API.getMoviesByCategory).toHaveBeenCalledWith('now_playing', 2);
      })
      .then(() => {
        expect(wrapper.state('now_playing')).toEqual([
          { title: 'title' }, 
          { title: 'why' }, 
          { title: 'there\'s more' }
        ])
      })
      .catch(err => console.log(err.message))

  })

  it('componentDidMount should call API.getMoviesByCateogry, sortMovies then setState with sortedMovies', () => {
    API.getMoviesByCategory = jest.fn().mockImplementation(() => Promise.resolve({
      results: [{ title: 'title'}, { title: 'why'}]
    }))
    wrapper = shallow(<App {...mockProps} />, {
      disableLifecycleMethods: false
    });
    wrapper.instance().setState = jest.fn();
    Utils.sortMovies = jest.fn().mockImplementation((movies) => {
      return movies
    })
    Promise.resolve({})
      .then(() => {
        expect(API.getMoviesByCategory).toHaveBeenCalledWith('now_playing')
      })
      .then(() => {
        expect(Utils.sortMovies).toHaveBeenCalledWith(
          [{ title: 'title' }, { title: 'why' }]
        )
      })
      .then(() => {
        expect(wrapper.instance().setState).toHaveBeenCalledWith({
          loading: false,
          now_playing: [{ title: 'title' }, { title: 'why' }]
        })
      })
      .then(() => {
        expect(mockProps.history.push).toHaveBeenCalledWith('/now_playing');
      })
      .catch(err => console.log(err.message))
  })
})
