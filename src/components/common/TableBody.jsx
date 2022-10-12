import React, { Component } from 'react';
import PropTypes, { shape } from 'prop-types';
import _ from 'lodash';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }

    return _.get(item, column.path);
  };

  createKey(item, column) {
    return item._id + (column.path || column.key);
  }

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.arrayOf(
    shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,

      genre: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
        .isRequired,

      numberInStock: PropTypes.number.isRequired,
      dailyRentalRate: PropTypes.number.isRequired,
    }).isRequired,
  )
    .isRequired,

  columns: PropTypes.arrayOf(
    shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  )
    .isRequired,
};

export default TableBody;
