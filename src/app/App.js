import React, { Component } from 'react';
import Header from '../header/Header';
import MovieContainer from '../movies-container/MoviesContainer';
import * as API from '../APImethods';
import * as Utils from '../utils';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'normalize.css';
import './App.css';

export class App extends Component {
  constructor() {
    super()
    this.state = {
      now_playing: [],
      popular: [],
      top_rated: [],
      searchTerms: '',
      searchResults: [],
      movie: []
    }
    this.grabSearchTerms = this.grabSearchTerms.bind(this);
    this.getNewCategory = this.getNewCategory.bind(this);
    this.searchMovies = this.searchMovies.bind(this);
    this.viewMovie = this.viewMovie.bind(this);
  }

  grabSearchTerms(e) {
    this.setState({
      searchTerms: Utils.normalize(e.target.value)
    })
  }

  searchMovies(event) {
    event.preventDefault();
    ['popular', 'top_rated'].forEach((category, i, cats) => {
      if (!this.state[category].length) {
        API.getMoviesByCategory(category)
          .then(movies => this.setState({ [category]: movies.results }))
          .then(() => {
            if(i === cats.length - 1) {
              this.createResults();
            }
          }).catch(err => console.log(err.message))
      } else if(i === cats.length - 1) {
          this.createResults();
      }
    })
    this.props.history.push('/searchResults')
  }

  createResults() {
    const { now_playing, popular, top_rated } = this.state;
    const results = Utils.formatResults([
      ...now_playing,
      ...popular,
      ...top_rated
    ], this.state.searchTerms);
    this.setState({ 
      searchResults: results,
      searchTerms: '' 
    });
  }

  getNewCategory(e) {
    const category = e.target.id;
    if(!this.state[category].length) {
      API.getMoviesByCategory(category)
        .then(movies => {
          const sortedMovies = Utils.sortMovies(movies.results)
          this.setState({ [category]: sortedMovies })
        
        })
        .catch(err => console.log(err.message))
    }
  }

  viewMovie(id) {
    API.getMovieDetails(id)
      .then(movie => {
        this.setState({ movie: [movie] });
        return movie;
      })
      .then(movie => {
        if(this.props.location.pathname !== `/movie/${movie.id}`) {
          this.props.history.push(`/movie/${movie.id}`)
        }
      })
      .catch(err => console.log(err.message))
  }

  componentDidMount() {
    API.getMoviesByCategory('now_playing')
      .then(movies => {
        const sortedMovies = Utils.sortMovies(movies.results)
        this.setState({ now_playing: sortedMovies })
      })
      .then(() => this.props.history.push('/now_playing'))
      .catch(err => console.log(err.message))
  }

  render() {
    return (
      <div>
        <h1 
          className="title"
          onClick={() => this.props.history.push('/now_playing')}
        >Ultimate Movie Guide</h1>
        <Header 
          grabSearchTerms={this.grabSearchTerms} 
          getNewCategory={this.getNewCategory}
          searchMovies={this.searchMovies}
          location={this.props.location}
          searchTerms={this.state.searchTerms}
        />
        <Route path='/:category' render={({ match }) => {
          const category = match.params.category;
          return (
            <MovieContainer 
              movies={this.state[category]}
              viewMovie={this.viewMovie}
              location={this.props.location}
              formatDate={Utils.formatDate}
            />
          )
        }} />
      </div>
    )
  }
}

App.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
}

export default withRouter(App);