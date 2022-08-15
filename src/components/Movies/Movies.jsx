import React, { Component } from 'react';

import movies from '../../services/fakeMovieService';

class Movies extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    movieItems: [...movies],
  };

  deleteMovie = (movieItemId) => {
    const { movieItems } = this.state;

    this.setState({
      movieItems: movieItems
        .filter((movie) => movie._id !== movieItemId),
    });
  };

  moviesCountFormat = () => {
    const { movieItems } = this.state;

    return movieItems.length === 1 ? 'movie' : 'movies';
  };

  renderMoviesCount = () => {
    const { movieItems } = this.state;

    if (movieItems.length) {
      return (
        <p className="my-5">
          Showing
          {' '}
          { movieItems.length }
          {' '}
          {this.moviesCountFormat()}
          {' '}
          in database.
        </p>
      );
    }

    return (
      <p className="my-5">
        There are no movies in the database.
      </p>
    );
  };

  render() {
    const { movieItems } = this.state;

    return (
      <>
        {this.renderMoviesCount()}

        { movieItems.length > 0 && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col" aria-label="Delete" />
            </tr>
          </thead>

          <tbody>
            {movieItems.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>

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
      </>
    );
  }
}

export default Movies;
