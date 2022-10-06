import React, { Component } from 'react';

import { getGenres } from '../../services/fakeGenreService';
import Like from '../common/Like';
import ListGroup from '../common/ListGroup';
import movies from '../../services/fakeMovieService';
import paginate from '../../utils/paginate';
import Pagination from '../common/Pagination';

class Movies extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    movieItems: [],
    currentPage: 1,
    pageSize: 4,
    genres: [],
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()];

    this.setState({ movieItems: [...movies], genres });
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

  render() {
    const {
      movieItems,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
    } = this.state;

    const filteredMovies = selectedGenre && selectedGenre._id ?
      movieItems.filter((movie) => movie.genre._id === selectedGenre._id) :
      movieItems;

    const paginatedMovies = paginate(filteredMovies, currentPage, pageSize);

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
          {this.renderMoviesCount(filteredMovies)}

          { movieItems.length > 0 && (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col" aria-label="Like" />
                  <th scope="col" aria-label="Delete" />
                </tr>
              </thead>

              <tbody>
                {paginatedMovies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>

                    <td>
                      <Like
                        isLiked={movie.isLiked}
                        onClick={() => this.handleLike(movie)}
                      />
                    </td>

                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => this.deleteMovie(movie._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <Pagination
            itemsCount={filteredMovies.length}
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
