import React from 'react';
import CustomMarker from './CustomMarker';


export default function MarkersList({ markers }) {
  const items = markers.map(({ key, position, name }) => (
    <CustomMarker key={key} position={position} name={name} />
  ));
  return <div>{items}</div>;
}


MarkersList.propTypes = {
  markers: React.PropTypes.array.isRequired,
};
