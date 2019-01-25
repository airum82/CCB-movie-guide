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
      searchTerms: ''
    }
    this.searchMovies = this.searchMovies.bind(this);
    this.getNewCategory = this.getNewCategory.bind(this);
  }

  searchMovies(e) {
    this.setState({
      searchTerms: e.target.value
    })
  }

  getNewCategory(e) {
    console.log(e.target.id);
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
        <Header searchMovies={this.searchMovies} getNewCategory={this.getNewCategory}/>
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