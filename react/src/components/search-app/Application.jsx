import React from 'react';
import SearchBarComponent from './SearchBarComponent';
import SearchResultsComponent from './SearchResultsComponent';


class Application extends React.Component {
  render() {
    return (
      <div>
        <SearchBarComponent host={ this.props.host } initQuery={ this.props.query }/>
        <hr />
        <SearchResultsComponent host={ this.props.host } query={ this.props.query } />
      </div>
    );
  }
}


Application.propTypes = {
  host: React.PropTypes.string.isRequired,
  query: React.PropTypes.string.isRequired,
};


export default Application;
