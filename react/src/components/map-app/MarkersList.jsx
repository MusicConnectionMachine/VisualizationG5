import React from 'react';
import CustomMarker from './CustomMarker';


export default function MarkersList({ markers }) {
  const items = markers.map(({ id, position, description }) => (
    <CustomMarker key={id} position={position} name={description} />
  ));
  return <div>{items}</div>;
}


MarkersList.propTypes = {
  markers: React.PropTypes.array.isRequired,
};
