import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    // eslint-disable-next-line react/prop-types
    selectedItem,
  } = props;

  function listGroupItemClasses(listItem) {
    return listItem === selectedItem ?
      'list-group-item active' :
      'list-group-item';
  }

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          role="menuitem"
          key={item[valueProperty]}
          className={listGroupItemClasses(item)}
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

ListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.exact({
    valueProperty: PropTypes.string.isRequired,
    textProperty: PropTypes.string.isRequired,
  }))
    .isRequired,

  valueProperty: PropTypes.string,
  textProperty: PropTypes.string,

  onItemSelect: PropTypes.func.isRequired,

  // selectedItem: PropTypes.objectOf(
  //   valueProperty: PropTypes.string.isRequired,
  //   textProperty: PropTypes.string.isRequired,
  // ).isRequired,
};

export default ListGroup;
