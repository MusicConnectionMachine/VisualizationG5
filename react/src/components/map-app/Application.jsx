import React from 'react';
import MapView from './MapView';


const demoMarkers = [
  { key: 'marker1', position: [51.5, -0.1], name: 'Marker 1' },
  { key: 'marker2', position: [51.51, -0.1], name: 'Marker 2' },
  { key: 'marker3', position: [51.49, -0.05], name: 'Marker 3' },
];


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }


  componentWillMount() {
    Promise.resolve({ markers: demoMarkers }).then((data) => {
      this.setState({ data });
    });
  }


  render() {
    if (this.state.data) {
      return (
        <MapView center={[51.505, -0.09]} markers={this.state.data.markers} />
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
