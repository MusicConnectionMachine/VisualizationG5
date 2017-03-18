import _ from 'lodash';
import React from 'react';


const PaginationSuggestions = (props) => {
  const {
    SuggestionComponent,
    suggestions,
    handleSuggestionClick,
  } = props;

  return (
    <div>
      {_.map(suggestions, (suggestion, index) =>
        <SuggestionComponent key={index} handleSuggestionClick={handleSuggestionClick} {...suggestion} />
      )}
    </div>
  );
};

PaginationSuggestions.propTypes = {
  suggestions: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
  })).isRequired,
  SuggestionComponent: React.PropTypes.func.isRequired,
  handleSuggestionClick: React.PropTypes.func.isRequired,
};


export default PaginationSuggestions;
