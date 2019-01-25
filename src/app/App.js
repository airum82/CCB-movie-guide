import React, { Component } from 'react';
import Header from '../header/Header';
import MovieContainer from '../movies-container/MoviesContainer';
import * as API from '../APImethods';

class App extends Component {
  constructor() {
    super()
    this.state = {
      nowPlaying: [],
      popular: [],
      topRated: [],
      searchTerms: ''
    }
    this.searchMovies = this.searchMovies.bind(this);
  }

  searchMovies(e) {
    this.setState({
      searchTerms: e.target.value
    })
  }

  componentDidMount() {
    API.getMoviesByCategory('now_playing')
      .then(movies => this.setState({ nowPlaying: movies.results }))
  }

  render() {
    return (
      <div>
        <Header searchMovies={this.searchMovies}/>
        <MovieContainer movies={this.state.nowPlaying} />
      </div>
    )
  }
}

export default App;