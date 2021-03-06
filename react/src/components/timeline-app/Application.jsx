import Papa from 'papaparse';
import React from 'react';
import MockDataService from './MockDataService';
import DataService from './DataService';
import IFrameService from '../../IFrameService';
import StartupService from '../../StartupService';
import TimelineComponent from './TimelineComponent';
import Utils from '../../Utils';


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: false,
      selectedEvents: null,
      fullScreenMode: false,
    };
    const CurrentDataService
      = StartupService.getEnvironment() === 'dev-mockups' ? MockDataService : DataService;
    this.dataService = new CurrentDataService(props.entityId, props.entityType);
    this.handleDownloadCsvClick = this.handleDownloadCsvClick.bind(this);
    this.handleFullScreenClick = this.handleFullScreenClick.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }


  componentWillMount() {
    this.dataService.fetchData(null).then((data) => {
      data.events.forEach((event) => {
        event.start = new Date(event.start);
      });
      data.events = data.events.filter(event => !isNaN(event.start.getTime()));
      if (data.events.length === 0) {
        throw new Error('No events available.');
      }
      this.setState({ data, selectedEvents: data.events });
    }).catch(() => { this.setState({ error: true }); });
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
    if (!this.state.fullScreenMode) {
      IFrameService.activateFullScreen('timeline');
    } else {
      IFrameService.deactivateFullScreen('timeline');
    }

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
    if (this.state.error) {
      return (
        <div>
          We can't find any interesting event. Maybe the <a href="https://en.wikipedia.org/wiki/Spacetime">
          spacetime continuum</a> is collapsed?
        </div>
      );
    }
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
          <TimelineComponent events={this.state.selectedEvents} />
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
  entityId: React.PropTypes.string.isRequired,
  entityType: React.PropTypes.string.isRequired,
};


export default Application;
