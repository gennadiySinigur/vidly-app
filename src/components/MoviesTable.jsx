import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Like from './common/Like';

class MoviesTable extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    this.props.onSort(sortColumn);
  };

  render() {
    const {
      paginatedMovies, onDelete, onLike,
    } = this.props;

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort('title')} scope="col">Title</th>
            <th onClick={() => this.raiseSort('genre.name')} scope="col">Genre</th>
            <th onClick={() => this.raiseSort('numberInStock')} scope="col">Stock</th>
            <th onClick={() => this.raiseSort('dailyRentalRate')} scope="col">Rate</th>
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
                  onClick={() => onLike(movie)}
                />
              </td>

              <td>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => onDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

MoviesTable.propTypes = {
  paginatedMovies: PropTypes.oneOfType({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,

    genre: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
      .isRequired,

    numberInStock: PropTypes.number.isRequired,
    dailyRentalRate: PropTypes.number.isRequired,
  })
    .isRequired,

  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,

  sortColumn: PropTypes.shape({
    path: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  })
    .isRequired,
};

export default MoviesTable;
