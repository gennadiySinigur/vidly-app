import React from 'react';
import PropTypes, { shape } from 'prop-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = (props) => {
  const {
    columns,
    sortColumn,
    onSort,
    data,
  } = props;

  return (
    <table className="table table-hover">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />

      <TableBody
        data={data}
        columns={columns}
      />
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    shape({
      path: PropTypes.string,
      label: PropTypes.string,
      key: PropTypes.string,
      content: PropTypes.func,
    }).isRequired,
  )
    .isRequired,

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

  onSort: PropTypes.func.isRequired,

  sortColumn: PropTypes.shape({
    path: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  })
    .isRequired,
};

export default Table;
