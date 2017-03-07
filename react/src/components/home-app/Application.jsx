import React from 'react';
import SearchBarComponent from '../search-app/SearchBarComponent';


class Application extends React.Component {
  render() {
    return (
      <div>
        <SearchBarComponent host={ this.props.host } />
      </div>
    );
  }
}

Application.propTypes = {
  host: React.PropTypes.string.isRequired,
};


export default Application;
