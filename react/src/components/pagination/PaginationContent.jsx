// Externals - Others
import _ from 'lodash';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';


const PaginationContent = (props) => {
  const {
    EntityComponent,
    entities,
    className,
  } = props;

  return (
    <div className={`${className}`}>
      <ListGroup>
        {_.map(entities, (entity, index) => (
          <ListGroupItem key={index}><EntityComponent {...entity} /></ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

PaginationContent.propTypes = {
  className: React.PropTypes.string,
  entities: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
  })).isRequired,
  EntityComponent: React.PropTypes.func.isRequired,
};

export default PaginationContent;
