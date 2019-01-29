import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';

describe('Header', () => {
  let wrapper;
  let props = {
    location: {
      pathname: 'pathname'
    },
    searchTerms: '',
    grabSearchTerms: jest.fn(),
    getNewCategory: jest.fn(),
    searchMovies: jest.fn(),
    searchTerms: jest.fn()
  }
  //conditional rendering
  it('renders as expected', () => {
    wrapper = shallow(<Header {...props} />)
    expect(wrapper).toMatchSnapshot();
  })

  it('renders as expected when pathname is /now_playing', () => {
    props.location.pathname = '/now_playing';
    wrapper = shallow(<Header {...props} />)
    expect(wrapper.find('#now_playing').hasClass('current-category')).toBe(true);
  })

  it('renders as expected when pathname is /popular', () => {
  props.location.pathname = '/popular'
  wrapper = shallow(<Header {...props} />)
  expect(wrapper.find('#popular').hasClass('current-category')).toBe(true)
  })

  it('renders as expected when pathname is /top_rated', () => {
  props.location.pathname = '/top_rated'
  wrapper = shallow(<Header {...props} />)
  expect(wrapper.find('#top_rated').hasClass('current-category')).toBe(true)
  })
  //calling prop functions
  beforeEach(() => {
    wrapper = shallow(<Header {...props} />)
  })

  it('should call getNewCategory when nav is clicked on', () => {
    wrapper.find('.header-nav').simulate('click');
    expect(props.getNewCategory).toHaveBeenCalled();
  })

  it('should call searchMovies when form is clicked on', () => {
    wrapper.find('.header-search').simulate('submit')
    expect(props.searchMovies).toHaveBeenCalled()
  })

  it('should call grabSearchTerms when typing into search input', () => {
    wrapper.find('.header-search input').simulate('change')
    expect(props.grabSearchTerms).toHaveBeenCalled()
  })

})
