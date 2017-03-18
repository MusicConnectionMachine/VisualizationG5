import React from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';


const PaginationSearch = props => ( // eslint-disable-line no-unused-vars
  <div className={`${props.className}`}>
    <InputGroup>
      <Input onChange={(e) => props.handleSearchChange(e.target.value)} />
      <InputGroupAddon onClick={() => props.handleSearchClick()}>Search</InputGroupAddon>
    </InputGroup>
  </div>
);

PaginationSearch.propTypes = {
  className: React.PropTypes.string,
  handleSearchChange: React.PropTypes.func.isRequired,
  handleSearchClick: React.PropTypes.func.isRequired,
};

export default PaginationSearch;
