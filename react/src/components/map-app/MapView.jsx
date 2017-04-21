import L from 'leaflet';
import React from 'react';
import { Map, TileLayer, PropTypes as MapPropTypes } from 'react-leaflet';
import '../../../scss/map-app.scss';
import '../../../node_modules/leaflet/dist/leaflet.css';
import icon from '../../../img/leafletv077/clef.png';
import iconShadow from '../../../node_modules/leaflet/dist/images/marker-shadow.png';
import MarkersList from './MarkersList';


const MAPBOX_AUTH_TOKEN = 'pk.eyJ1IjoieXNkZXZ5cyIsImEiOiJjajByMWljMncwMWp3MnFyeG5oNGdrNTltIn0.7bSRbrkT1zy3kYvXvWNgMw';
const MAPBOX_URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_AUTH_TOKEN}`;


const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [10, 31],
});

L.Marker.prototype.options.icon = DefaultIcon;


export default class MapView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showMap: true,
    };

    this.map = null;
  }


  updateCenter() {
    const leafletElement = this.map.leafletElement;
    this.props.onViewChanged({
      center: leafletElement.getCenter(),
      zoom: leafletElement.getZoom(),
    });
  }


  redrawMap() {
    // This forces the map to completely rerender. It's necessary because the map otherwise shows
    // some grey areas.
    this.updateCenter();
    this.setState({
      showMap: false,
    });
    setTimeout(() => { this.setState({ showMap: true }); }, 50);
  }


  render() {
    return (
      <div className="widget__body">
        { this.state.showMap && (
          <Map
            center={this.props.center} zoom={this.props.zoom}
            maxZoom={17} minZoom={2} ref={(map) => { this.map = map; }}
          >
            <TileLayer
              url={MAPBOX_URL}
            />
            <MarkersList markers={this.props.markers} />
          </Map>
        )}
      </div>
    );
  }
}


MapView.propTypes = {
  center: MapPropTypes.latlng.isRequired,
  markers: React.PropTypes.array.isRequired,
  onViewChanged: React.PropTypes.func.isRequired,
  zoom: React.PropTypes.number.isRequired,
};
