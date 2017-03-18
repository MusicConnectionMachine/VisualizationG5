import React from 'react';


class Composer extends React.Component {

  render() {
    const { title } = this.props;

    return (
      <div>
        {title}
      </div>
    );
  }
}

Composer.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default Composer;
