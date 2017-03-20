// Externals - Others
import _ from 'lodash';
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';


const PaginationContent = (props) => {
  const {
    EntityComponent,
    entities,
    className,
    loading,
  } = props;

  return (
    <div className={`${className}`}>
      {loading && (
        <div className="pagination-content__loading"> Loading content... </div>
      )}

      {!loading && (
        <ListGroup>
          {_.map(entities, (entity, index) => (
            <ListGroupItem key={index}><EntityComponent {...entity} /></ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

PaginationContent.propTypes = {
  className: React.PropTypes.string,
  loading: React.PropTypes.bool.isRequired,
  entities: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
  })).isRequired,
  EntityComponent: React.PropTypes.func.isRequired,
};

export default PaginationContent;
