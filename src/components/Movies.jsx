import React, { Component } from 'react';
import _ from 'lodash';

import ListGroup from './common/ListGroup';
import MoviesTable from './MoviesTable';
import Pagination from './common/Pagination';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import paginate from '../utils/paginate';

class Movies extends Component {
  state = {
    movieItems: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],

    sortColumn: {
      path: 'title',
      order: 'asc',
    },
  };

  componentDidMount() {
    const genres = [
      { _id: '', name: 'All Genres' },
      ...getGenres(),
    ];

    this.setState({ movieItems: getMovies(), genres });
  }

  deleteMovie = (movieItemId) => {
    const { movieItems } = this.state;

    this.setState({
      movieItems: movieItems
        .filter((movie) => movie._id !== movieItemId),
    });
  };

  handleLike = (movie) => {
    const movieItems = [...this.state.movieItems];
    const index = movieItems.indexOf(movie);

    movieItems[index] = { ...movieItems[index] };
    movieItems[index].isLiked = !movieItems[index].isLiked;

    this.setState((previousState) => ({
      ...previousState,
      movieItems,
    }));
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState(() => (
      { sortColumn }
    ));
  };

  moviesCountFormat = () => {
    const { movieItems } = this.state;

    return movieItems.length === 1 ? 'movie' : 'movies';
  };

  renderMoviesCount = (movieElements) => {
    if (movieElements.length) {
      return (
        <p className="mb-5">
          Showing
          {' '}
          { movieElements.length }
          {' '}
          {this.moviesCountFormat()}
          {' '}
          in database.
        </p>
      );
    }

    return (
      <p className="mb-5">
        There are no movies in the database.
      </p>
    );
  };

  getPagedData = () => {
    const {
      movieItems,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filteredMovies = selectedGenre && selectedGenre._id ?
      movieItems.filter((movie) => movie.genre._id === selectedGenre._id) :
      movieItems;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order],
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const {
      movieItems,
      pageSize,
      currentPage,
      genres,
      sortColumn,
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col-10">
          {this.renderMoviesCount(movieItems)}

          { movieItems.length > 0 && (
            <MoviesTable
              paginatedMovies={movies}
              onLike={this.handleLike}
              onDelete={this.deleteMovie}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
          )}

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
