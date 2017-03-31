import MockDataService from './MockDataService';
import React from 'react';
import TimelineComponent from './TimelineComponent';


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      selectedEvents: null,
      fullScreenMode: false,
    };
    this.handleFullScreenClick = this.handleFullScreenClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }


  componentWillMount() {
    MockDataService.fetchData(null).then((data) => {
      data.events.forEach((event, i) => event.id = i);
      this.setState({ data, selectedEvents: data.events });
    });
  }

  handleFullScreenClick() {
    this.setState({ fullScreenMode: !this.state.fullScreenMode });
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
        <div className={`timeline ${this.state.fullScreenMode ? 'timeline--full-screen' : ''}`}>
          <div className="timeline__control-bar">
            <h4 className="timeline__control-bar__title">Chronicles of { this.state.data.name }</h4>
            <a href="#"><div className="timeline__control-bar__full-button" onClick={this.handleFullScreenClick} /></a>
            <input className="timeline__control-bar__search-field" type="text" placeholder="Search..." onChange={this.handleSearchChange} />
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
