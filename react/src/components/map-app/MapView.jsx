import L from 'leaflet';
import React from 'react';
import { Map, TileLayer, PropTypes as MapPropTypes } from 'react-leaflet';
import '../../../scss/map-app.scss';
import '../../../node_modules/leaflet/dist/leaflet.css';
import icon from '../../../img/leafletv077/clef.png';
import iconShadow from '../../../node_modules/leaflet/dist/images/marker-shadow.png';
import MarkersList from './MarkersList';


const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;


const mapInitialState = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13,
};


export default class MapView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      mapInitialState: {
        center: this.props.center,
        zoom: 13,
      },
    };
  }

  render() {
    return (
      <Map center={this.props.center ? this.props.center : mapInitialState.center} zoom={mapInitialState.zoom}>
        <TileLayer
          url={'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoieXNkZXZ5cyIsImEiOiJjajByMWljMncwMWp3MnFyeG5oNGdrNTltIn0.7bSRbrkT1zy3kYvXvWNgMw'}
        />
        <MarkersList markers={this.props.markers} />
      </Map>
    );
  }
}

MapView.propTypes = {
  markers: React.PropTypes.array.isRequired,
  center: MapPropTypes.latlng.isRequired,
};
