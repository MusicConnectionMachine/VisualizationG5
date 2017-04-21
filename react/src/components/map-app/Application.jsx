import Papa from 'papaparse';
import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MapDataService from './MapDataService';
import MapView from './MapView';
import Utils from '../../Utils';


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      cities: null,
      places: null,
      fullScreenMode: false,
      zoom: 13,
    };

    this.mapView = null;
    this.dataService = new MapDataService();

    this.handleDownloadCsvClick = this.handleDownloadCsvClick.bind(this);
    this.handleFullScreenClick = this.handleFullScreenClick.bind(this);
    this.handleMapViewChanged = this.handleMapViewChanged.bind(this);
  }


  componentWillMount() {
    MapDataService._getMockPlaces().then((places) => {
      const cityMap = new Map(places.map(place => [place.city, place]));
      const cities = Array.from(cityMap.values()).sort((c1, c2) => {
        if (c1.city < c2.city) {
          return -1;
        }
        return 1;
      });
      const center = places.length > 0 ? places[0].position : [48.262442, 11.669139];
      this.setState({ center, places, cities });
    });
  }


  handleCityChosen(place) {
    this.mapView.updateCenter();
    setTimeout(() => { this.setState({ center: place.position }); }, 50);
  }


  handleDownloadCsvClick() {
    const csv = Papa.unparse({
      fields: ['lat', 'lng', 'city', 'description'],
      data: this.state.places.map(place => [
        place.lat,
        place.lng,
        place.city,
        place.description,
      ]),
    });
    Utils.download('places.csv', csv, 'text/csv');
  }


  handleFullScreenClick() {
    this.setState({ fullScreenMode: !this.state.fullScreenMode });
    this.mapView.redrawMap();
  }


  handleMapViewChanged({ center, zoom }) {
    this.setState({ center, zoom });
  }


  render() {
    if (this.state.places !== undefined && this.state.places !== null) {
      return (
        <div className={`widget ${this.state.fullScreenMode ? 'widget--full-screen' : ''}`}>
          <div className="widget__control-bar row">
            <div className="col-12 widget__control-bar__search-field">
              <UncontrolledDropdown
                className="map__city-selection"
              >
                <DropdownToggle caret>
                  Select a city
                </DropdownToggle>
                <DropdownMenu>
                  {this.state.cities.map(place => (
                    <DropdownItem
                      key={place.id}
                      onClick={this.handleCityChosen.bind(this, place)}
                    >{place.city}</DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
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
          <MapView
            center={this.state.center} zoom={this.state.zoom}
            markers={this.state.places}
            onViewChanged={this.handleMapViewChanged}
            ref={(mapView) => { this.mapView = mapView; }}
          />
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
