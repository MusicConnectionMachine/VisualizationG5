import React from 'react';
import { Badge } from 'reactstrap';


class EntitySuggestion extends React.Component {
  render() {
    const {
      className,
      entitySuggestion,
      onEntitySuggestionClick,
    } = this.props;

    return (
      <div className={`entity-suggestion ${className}`} onClick={() => onEntitySuggestionClick(entitySuggestion)}>
        <p className="entity-suggestion__title"> {entitySuggestion.title} </p>
        <Badge className="badge"> {entitySuggestion.type} </Badge>
      </div>
    );
  }
}

EntitySuggestion.propTypes = {
  entitySuggestion: React.PropTypes.shape({
    title: React.PropTypes.string,
  }).isRequired,
  onEntitySuggestionClick: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
};

export default EntitySuggestion;
