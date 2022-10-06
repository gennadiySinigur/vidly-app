import React from 'react';
import PropTypes from 'prop-types';

import Like from './common/Like';

const MoviesTable = (props) => {
  const { paginatedMovies, onDelete, onLike } = props;

  return (
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
};

MoviesTable.propTypes = {
  paginatedMovies: PropTypes.oneOfType({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,

    genre: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,

    numberInStock: PropTypes.number.isRequired,
    dailyRentalRate: PropTypes.number.isRequired,
  }).isRequired,

  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MoviesTable;
