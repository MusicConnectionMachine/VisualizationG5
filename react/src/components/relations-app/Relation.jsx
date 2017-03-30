import React from 'react';


class Relation extends React.Component {
  render() {
    const { relation } = this.props;

    return (
      <div className="relation">
        <p className="relation__title">
          {relation.title}
        </p>
      </div>
    );
  }
}

Relation.propTypes = {
  relation: React.PropTypes.shape({
    title: React.PropTypes.string,
  }).isRequired,
};

export default Relation;
