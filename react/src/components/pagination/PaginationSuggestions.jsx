import _ from 'lodash';
import React from 'react';


const PaginationSuggestions = (props) => {
  const {
    SuggestionComponent,
    suggestions,
    handleSuggestionClick,
    loading,
  } = props;

  return (
    <div>
      {loading && (
        <div> Loading suggestions... </div>
      )}

      {!loading && (
        <div>
          {_.map(suggestions, (suggestion, index) =>
            <SuggestionComponent key={index} handleSuggestionClick={handleSuggestionClick} {...suggestion} />
          )}
        </div>
      )}
    </div>
  );
};

PaginationSuggestions.propTypes = {
  suggestions: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
  })).isRequired,
  SuggestionComponent: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  handleSuggestionClick: React.PropTypes.func.isRequired,
};


export default PaginationSuggestions;
