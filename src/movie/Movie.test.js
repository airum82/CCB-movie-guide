import React from 'react';
import Movie from './Movie';
import { shallow } from 'enzyme';

describe('Movie', () => {
  let wrapper;
  const mockProps = {
    movie: {
      id: '583',
      title: 'the fakening',
      overview: 'so so fake',
      release_date: '1-35-3000',
      vote_average: '10',
      poster_path: 'thispath/3445'
    },
    formatReleaseDate: jest.fn(),
    viewMovie: jest.fn(),
    location: {
      pathname: '/now_playing'
    }
  }
  beforeEach(() => {
    wrapper = shallow(<Movie {...mockProps} />)
  })

  it('should match snapshot upon render', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render movie details when pathname is "movie/id"', () => {
    mockProps.location.pathname = '/movie/583';
    wrapper = shallow(<Movie {...mockProps} />);
    expect(wrapper.find('.movie-details').length).toBe(1);
  })

  it('should not render movie details when pathname is not "movie/id"', () => {
    mockProps.location.pathname = '/now_playing'
    wrapper = shallow(<Movie {...mockProps} />)
    expect(wrapper.find('.movie-details').length).toBe(0)
  })

  //prop functions
  it('should call viewMovie with correct params when clicked on', () => {
    wrapper.find('article').simulate('click');
    expect(mockProps.viewMovie).toHaveBeenCalledWith(mockProps.movie.id)
  })

  it('should call formatReleaseDate with correct params on render', () => {
    mockProps.location.pathname = '/movie/583';
    wrapper = shallow(<Movie {...mockProps} />);
    expect(mockProps.formatReleaseDate).toHaveBeenCalledWith(mockProps.movie.release_date);
  })
})