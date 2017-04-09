import React from 'react';
import _ from 'lodash';

import RelationItem from './RelationItem.jsx';


export default class RelationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { relations, className } = this.props;

    return (
      <div className={`relation-widget__body ${className}`}>
        {_.map(relations, relation =>
          <RelationItem
            key={relation.id}
            className="relation-widget-list__item"
            relation={relation}
          />
        )}
      </div>
    );
  }
}


RelationList.propTypes = {
  relations: React.PropTypes.array.isRequired,
  className: React.PropTypes.string,
};
