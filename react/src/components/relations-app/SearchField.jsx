import React from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';


const SearchField = props => (
  <div className={`${props.className}`}>
    <InputGroup>
      <InputGroupAddon>Search</InputGroupAddon>
      <Input
        value={props.query}
        placeholder="Composer, music piece, work or relation"
        onChange={(e) => props.handleSearchChange(e.target.value)}
      />
    </InputGroup>
  </div>
);

SearchField.propTypes = {
  className: React.PropTypes.string,
  query: React.PropTypes.string,
  handleSearchChange: React.PropTypes.func.isRequired,
  handleSearchClick: React.PropTypes.func.isRequired,
};

export default SearchField;
