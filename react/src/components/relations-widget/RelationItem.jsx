import React from 'react';


export default class RelationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { relation, className } = this.props;

    return (
      <div className={`relation-item ${className}`}>
        { relation.relation } - { relation.entity2 }
      </div>
    );
  }
}


RelationItem.propTypes = {
  relation: React.PropTypes.any,
  className: React.PropTypes.string,
};
