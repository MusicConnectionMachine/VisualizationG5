import React from 'react';
import { Badge } from 'reactstrap';


class Entity extends React.Component {
  render() {
    const { entity, className } = this.props;

    return (
      <div className={`entity ${className}`}>
        <p className="entity__title"> {entity.title} </p>
        <Badge className="badge"> {entity.type} </Badge>
      </div>
    );
  }
}

Entity.propTypes = {
  entity: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
  }).isRequired,
  className: React.PropTypes.string,
};

export default Entity;
