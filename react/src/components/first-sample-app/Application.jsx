import CommonComponent from '../CommonComponent';
import React from 'react';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
  }

  render() {
    const { toggle } = this.state;

    return (
      <div style={ toggle ? { backgroundColor: 'red' } : {} }>
        First Sample Application
        <button onClick={() => this.setState({ toggle: !toggle })}> { toggle ? 'Click me again!' : 'Click meeeeee!' } </button>
        <CommonComponent />
      </div>
    );
  }
}

export default Application;
