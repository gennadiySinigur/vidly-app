import React from 'react';
import PropTypes from 'prop-types';

const Like = ({ isLiked, onClick }) => {
  let likeClasses = 'fa fa-heart';

  if (!isLiked) {
    likeClasses += '-o';
  }

  return (
    <i
      className={likeClasses}
      style={{ cursor: 'pointer' }}
      aria-hidden="true"
      onClick={onClick}
    />
  );
};

Like.propTypes = {
  isLiked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Like;
