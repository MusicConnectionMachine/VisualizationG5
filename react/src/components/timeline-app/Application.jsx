import MockDataService from './MockDataService';
import React from 'react';
import TimelineComponent from './TimelineComponent';


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }


  componentWillMount() {
    MockDataService.fetchData(null).then((data) => {
      this.setState({ data });
    });
  }


  render() {
    if (this.state.data) {
      return (
        <div>
          <h4>Chronicles of { this.state.data.name }</h4>
          <TimelineComponent data={ this.state.data }/>
        </div>
      );
    }
    return (
      <div>
        Loading data...
      </div>
    );
  }
}


Application.propTypes = {
  host: React.PropTypes.string.isRequired,
};


export default Application;
