import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />, {
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

  //do searchMovies later

  it('createResults should setState with results that match search terms', () => {
    wrapper.instance().setState({
      now_playing: [{ title: 'Robin' }, { title: 'Batman'}, { title: 'Robinson'}],
      popular: [{ title: 'Parent Trap'}, { title: 'Robbery'}]
    });
    const mockEvent = {
      target: {
        value: 'Rob'
      }
    };
    const expectedResult = [
      { title: 'Robin' }, 
      { title: 'Robinson' }, 
      { title: 'Robbery' }
    ]
    wrapper.instance().grabSearchTerms(mockEvent);
    wrapper.instance().createResults();
    expect(wrapper.state('searchResults')).toEqual(expectedResult);
  })

  //test get new category later

  //test viewMovie later

  it('formatReleaseDate should format the imdb date to american standards', () => {
    const rawDate = '2019-01-15';
    const expectedResult = '01-15-2019';
    const result = wrapper.instance().formatReleaseDate(rawDate);
    expect(result).toEqual(expectedResult);
  })

})
