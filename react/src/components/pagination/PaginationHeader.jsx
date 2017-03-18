import React from 'react';


const PaginationHeader = (props) => {
  const {
    title,
    className,
  } = props;

  return (
    <h2 className={`${className}`}>
      {title}
    </h2>
  );
};

PaginationHeader.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string.isRequired,
};

export default PaginationHeader;
