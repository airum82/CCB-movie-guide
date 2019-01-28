import React, { Component } from 'react';
import Header from '../header/Header';
import MovieContainer from '../movies-container/MoviesContainer';
import * as API from '../APImethods';
import { Route, withRouter } from 'react-router-dom';
import 'normalize.css';
import './App.css';

class App extends Component {
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
    this.formatReleaseDate = this.formatReleaseDate.bind(this);
  }

  grabSearchTerms(e) {
    this.setState({
      searchTerms: (e.target.value).toLowerCase()
    })
  }

  searchMovies() {
    event.preventDefault();
    ['popular', 'top_rated'].forEach((category, i, cats) => {
      if (!this.state[category].length) {
        API.getMoviesByCategory(category)
          .then(movies => this.setState({ [category]: movies.results }))
          .then(() => {
            if(i === cats.length - 1) {
              this.createResults();
            }
          }).then(() => this.props.history.push('/searchResults'))
      } else if(i === cats.length - 1) {
          this.createResults();
      }
    })
    this.props.history.push('/searchResults')
  }

  createResults() {
    const { now_playing, popular, top_rated } = this.state;
    const results = [...now_playing, ...popular, ...top_rated].reduce((results, movie) => {
      if (movie.title.toLowerCase().includes(this.state.searchTerms)) {
        const duplicate = results.find(result =>
          result.title.toLowerCase() === movie.title.toLowerCase())
        if (!duplicate) results.push(movie);
      }
      return results;
    }, [])
    this.setState({ 
      searchResults: results,
      searchTerms: '' 
    })
  }

  getNewCategory(e) {
    const category = e.target.id;
    if(!this.state[category].length) {
      API.getMoviesByCategory(category)
        .then(movies => this.setState({ [category]: movies.results }))
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
  }

  formatReleaseDate(date) {
    const dateArray = date.split('-');
    return `${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`
  }

  componentDidMount() {
    API.getMoviesByCategory('now_playing')
      .then(movies => this.setState({ now_playing: movies.results }))
      .then(() => this.props.history.push('/now_playing'))
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
              formatReleaseDate={this.formatReleaseDate}
            />
          )
        }} />
      </div>
    )
  }
}

export default withRouter(App);