import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Like from './common/Like';
import TableHeader from './common/TableHeader';
import TableBody from './common/TableBody';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },

    {
      key: 'like',
      content: (movie) => (
        <Like
          onClick={() => this.props.onLike(movie)}
          isLiked={movie.isLiked}
        />
      ),
    },

    {
      key: 'delete',
      content: (movie) => (
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => this.props.onDelete(movie._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const {
      paginatedMovies, onSort, sortColumn,
    } = this.props;

    return (
      <table className="table table-hover">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

        <TableBody
          data={paginatedMovies}
          columns={this.columns}
        />
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
