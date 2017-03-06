import React from 'react';
import rd3 from 'react-d3-library';
import * as d3 from 'd3';

const RD3Component = rd3.Component;


function createGraph() {
  const node = document.createElement('div');
  d3.select(node)
    .append('svg')
    .attr('width', 200)
    .attr('height', 200)
    .append('circle')
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', 40);
  return node;
}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { d3: '' };
  }

  componentDidMount() {
    this.setState({ d3: createGraph() }); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <RD3Component data={this.state.d3} />
      </div>
    );
  }
}

export default Application;
