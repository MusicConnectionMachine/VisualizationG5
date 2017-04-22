import React from 'react';
import { Marker, Popup, PropTypes as MapPropTypes } from 'react-leaflet';


export default function CustomMarker({ position, name }) {
  return (
    <Marker position={position}>
      <Popup>
        <span>{name}</span>
      </Popup>
    </Marker>
  );
}


CustomMarker.propTypes = {
  name: MapPropTypes.children.isRequired,
  position: MapPropTypes.latlng.isRequired,
};
