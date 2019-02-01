import React from 'react';
import MovieContainer from './MoviesContainer';
import { shallow } from 'enzyme';

describe('MovieContainer', () => {
  let wrapper;
  const mockProps = {
    movies: [{ title: 'fake1'}, { title: 'fake2'}],
    viewMovie: jest.fn(),
    location: {
      pathname: '/now_playing'
    },
    formatDate: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<MovieContainer  {...mockProps} />)
  })

  //rendering
  it('should match snapshot upon render', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should have class "movie-container-single" when pathname includes "movie"', () => {
    mockProps.location.pathname = '/movie/543455';
    wrapper = shallow(<MovieContainer {...mockProps} />)
    expect(wrapper.find('section').hasClass('movie-container-single')).toBe(true);
  })

  it('should not have class "movie-container-single" when pathname does not include "movie"', () => {
    mockProps.location.pathname = '/now_playing';
    wrapper = shallow(<MovieContainer {...mockProps} />)
    expect(wrapper.find('section').hasClass('movie-container-single')).toBe(false)
  })

  it('should have class "movie-container" when pathname does not include "movie"', () => {
    expect(wrapper.find('section').hasClass('movie-container')).toBe(true);
  })

  it('should not have class "movie-container" when pathname does include "movie"', () => {
    mockProps.location.pathname = '/movie/3453';
    wrapper = shallow(<MovieContainer {...mockProps} />)
    expect(wrapper.find('section').hasClass('movie-container')).toBe(false)
  })
})