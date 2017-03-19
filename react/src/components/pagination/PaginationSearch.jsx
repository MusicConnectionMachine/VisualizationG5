import React from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';


const PaginationSearch = props => (
  <div className={`${props.className}`}>
    <InputGroup>
      <Input value={props.query} onChange={(e) => props.handleSearchChange(e.target.value)} />
      <InputGroupAddon className="pagination-search__button" onClick={() => props.handleSearchClick()}>Search</InputGroupAddon>
    </InputGroup>
  </div>
);

PaginationSearch.propTypes = {
  className: React.PropTypes.string,
  query: React.PropTypes.string,
  handleSearchChange: React.PropTypes.func.isRequired,
  handleSearchClick: React.PropTypes.func.isRequired,
};

export default PaginationSearch;
