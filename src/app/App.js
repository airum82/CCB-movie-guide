import React, { Component } from 'react';
import Header from '../header/Header';
import MovieContainer from '../movies-container/MoviesContainer';
import * as API from '../APImethods';
import { Route, withRouter } from 'react-router-dom';

class App extends Component {
  constructor() {
    super()
    this.state = {
      now_playing: [],
      popular: [],
      top_rated: [],
      searchTerms: '',
      searchResults: []
    }
    this.grabSearchTerms = this.grabSearchTerms.bind(this);
    this.getNewCategory = this.getNewCategory.bind(this);
    this.searchMovies = this.searchMovies.bind(this);
  }

  grabSearchTerms(e) {
    this.setState({
      searchTerms: (e.target.value).toLowerCase()
    })
  }

  searchMovies() {
    event.preventDefault();
    ['popular', 'top_rated'].forEach((category, i, cat) => {
      if (!this.state[category].length) {
        API.getMoviesByCategory(category)
          .then(movies => this.setState({ [category]: movies.results }))
          .then(() => {
            if(i === cat.length - 1) {
              const { now_playing, popular, top_rated } = this.state;
              const results = [...now_playing, ...popular, ...top_rated].reduce((results, movie) => {
                if (movie.title.toLowerCase().includes(this.state.searchTerms)) {
                  const duplicate = results.find(result => 
                    result.title.toLowerCase() === movie.title.toLowerCase())
                  if(!duplicate) results.push(movie);
                }
                return results;
              }, [])
              this.setState({ searchResults: results })
            }
          }).then(() => this.props.history.push('/searchResults'))
      } else if(i === cat.length - 1) {
        const { now_playing, popular, top_rated } = this.state
        const results = [...now_playing, ...popular, ...top_rated].reduce((results, movie) => {
          if (movie.title.toLowerCase().includes(this.state.searchTerms)) {
            const duplicate = results.find(result =>
              result.title.toLowerCase() === movie.title.toLowerCase())
            if (!duplicate) results.push(movie);
          }
          return results;
        }, [])
        this.setState({ searchResults: results })
      }
    })
  }

  getNewCategory(e) {
    const category = e.target.id;
    if(!this.state[category].length) {
      API.getMoviesByCategory(category)
        .then(movies => this.setState({ [category]: movies.results }))
    }
  }

  componentDidMount() {
    API.getMoviesByCategory('now_playing')
      .then(movies => this.setState({ now_playing: movies.results }))
      .then(() => this.props.history.push('/now_playing'))
  }

  render() {
    return (
      <div>
        <Header 
          grabSearchTerms={this.grabSearchTerms} 
          getNewCategory={this.getNewCategory}
          searchMovies={this.searchMovies}
        />
        <Route path='/:category' render={({ match }) => {
          const category = match.params.category;
          return (
            <MovieContainer movies={this.state[category]}/>
          )
        }} />
      </div>
    )
  }
}

export default withRouter(App);