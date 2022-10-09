import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Like from './common/Like';
import TableHeader from './common/TableHeader';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    { key: 'like' },
    { key: 'delete' },
  ];

  render() {
    const {
      paginatedMovies, onDelete, onLike, onSort, sortColumn,
    } = this.props;

    return (
      <table className="table table-hover">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

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
