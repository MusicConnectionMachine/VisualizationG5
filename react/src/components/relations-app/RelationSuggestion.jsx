import React from 'react';


class RelationSuggestion extends React.Component {
  render() {
    const {
      className,
      relationSuggestion,
      onRelationSuggestionClick,
    } = this.props;

    return (
      <div className={`relation-suggestion ${className}`} onClick={() => onRelationSuggestionClick(relationSuggestion)}>
        <p className="relation-suggestion__title"> {relationSuggestion.title} </p>
      </div>
    );
  }
}

RelationSuggestion.propTypes = {
  relationSuggestion: React.PropTypes.shape({
    title: React.PropTypes.string,
  }).isRequired,
  onRelationSuggestionClick: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
};

export default RelationSuggestion;
