import MockDataService from './MockDataService';
import React from 'react';
import TimelineComponent from './TimelineComponent';


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      selectedEvents: null,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }


  componentWillMount() {
    MockDataService.fetchData(null).then((data) => {
      data.events.forEach((event, i) => event.id = i);
      this.setState({ data, selectedEvents: data.events });
    });
  }


  handleSearchChange(e) {
    const value = e.target.value.toLowerCase();
    if (!value) {
      this.setState({ selectedEvents: this.state.data.events });
    } else {
      this.setState({
        selectedEvents: this.state.data.events.filter(event =>
          event.title.toLowerCase().includes(value) || (event.description && event.description.toLowerCase().includes(value))),
      });
    }
  }


  render() {
    if (this.state.data) {
      return (
        <div className="timeline">
          <div className="timeline__control-bar">
            <h4>Chronicles of { this.state.data.name }</h4>
            <input type="text" placeholder="Search..." onChange={this.handleSearchChange} />
          </div>
          <TimelineComponent events={ this.state.selectedEvents }/>
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
