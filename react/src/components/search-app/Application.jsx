import React from 'react';
import SearchBarComponent from './SearchBarComponent';
import SearchResultsComponent from './SearchResultsComponent';


class Application extends React.Component {

  constructor(props) {
    super(props);
    this.state = { toggle: false };
  }


  render() {
    const { toggle } = this.state;

    return (
      <div style={ toggle ? { backgroundColor: 'red' } : {} }>
        <SearchBarComponent query={ window.__dataForReact.query }/>
        <hr />
        <SearchResultsComponent />
      </div>
    );
  }
}


export default Application;
