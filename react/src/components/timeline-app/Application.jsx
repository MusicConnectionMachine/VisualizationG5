import MockDataService from './MockDataService';
import Papa from 'papaparse';
import React from 'react';
import TimelineComponent from './TimelineComponent';
import Utils from '../../Utils';


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      selectedEvents: null,
      fullScreenMode: false,
    };
    this.handleDownloadCsvClick = this.handleDownloadCsvClick.bind(this);
    this.handleFullScreenClick = this.handleFullScreenClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }


  componentWillMount() {
    MockDataService.fetchData(null).then((data) => {
      data.events.forEach((event, i) => {
        event.id = i;
        event.start = new Date(event.start);
      });
      this.setState({ data, selectedEvents: data.events });
    });
  }


  handleDownloadCsvClick() {
    const csv = Papa.unparse({
      fields: ['date', 'title', 'description', 'source'],
      data: this.state.selectedEvents.map(event => [
        `${event.start.getFullYear()}-${event.start.getMonth() + 1}-${event.start.getDate()}`,
        event.title,
        event.description,
        event.link,
      ]),
    });
    Utils.download('events.csv', csv, 'text/csv');
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
        <div className={`widget ${this.state.fullScreenMode ? 'widget--full-screen' : ''}`}>
          <div className="widget__control-bar row">
            <h5 className="widget__control-bar__title col-12 col-sm-8 col-md-6">
              Chronicles of { this.state.data.name }
            </h5>
            <div className="col-12 col-sm-4 col-md-6 widget__control-bar__search-field">
              <input
                className="form-control"
                type="text" placeholder="Search..." onChange={this.handleSearchChange}
              />
            </div>
            <a href="#">
              <div
                className="widget__control-bar__button widget__control-bar__full-button"
                onClick={this.handleFullScreenClick}
              />
            </a>
            <a href="#">
              <div
                className="widget__control-bar__button widget__control-bar__download-button"
                onClick={this.handleDownloadCsvClick}
              />
            </a>
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
