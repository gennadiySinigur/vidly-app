import React, { Component } from 'react';
import PropTypes, { shape } from 'prop-types';

class TableHeader extends Component {
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

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) {
      return null;
    }

    if (sortColumn.order === 'asc') {
      return (
        <i className="fa fa-sort-asc" />
      );
    }

    return (
      <i className="fa fa-sort-desc" />
    );
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label}
              {' '}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  sortColumn: PropTypes.shape({
    path: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  })
    .isRequired,

  onSort: PropTypes.func.isRequired,

  columns: PropTypes.arrayOf(
    shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  )
    .isRequired,
};

export default TableHeader;
