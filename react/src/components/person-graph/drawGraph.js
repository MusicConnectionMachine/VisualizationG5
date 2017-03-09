/*eslint-disable*/
import * as d3 from 'd3';

export default function drawGraph(container) {
  const data = {
    nodes: [
      {
        'index': 0,
        'name': 'Test1',
        'group': 1,
      },
      {
        'index': 1,
        'name': 'Test2',
        'group': 1,
      },
      {
        'index': 2,
        'name': 'Test3',
        'group': 2,
      },
      {
        'index': 3,
        'name': 'Test4',
        'group': 3,
      },
      {
        'index': 4,
        'name': 'Test5',
        'group': 1,
      },
      {
        'index': 5,
        'name': 'Test5',
        'group': 1,
      },
      {
        'index': 6,
        'name': 'Test5',
        'group': 1,
      },
      {
        'index': 7,
        'name': 'Test5',
        'group': 1,
      },
    ],
    links: [
      {
        source: 0,
        target: 1,
        value: 3,
      },
      {
        source: 0,
        target: 2,
        value: 3,
      },
      {
        source: 0,
        target: 3,
        value: 1,
      },
      {
        source: 0,
        target: 4,
        value: 5,
      },
      {
        source: 4,
        target: 5,
        value: 5,
      },
      {
        source: 4,
        target: 6,
        value: 5,
      },
      {
        source: 4,
        target: 7,
        value: 5,
      },
    ],
  };

  const width = 500;
  const height = 500;

  const color = d3.scaleOrdinal(d3.schemeCategory20);

  const simulation = d3.forceSimulation(data.nodes)
    .force('charge', d3.forceManyBody())
    .force('link', d3.forceLink(data.links).distance(50))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .on('tick', ticked);


  const svg = d3.select(container).append('svg')
    .attr('width', width)
    .attr('height', height);


  const links = svg.selectAll('.link')
    .data(data.links)
    .enter().append('line')
    .attr('class', 'link')
    .style('stroke-width', d => Math.sqrt(d.value));

  const nodes = svg.selectAll('.node')
    .data(data.nodes)
    .enter().append('circle')
    .attr('class', 'node')
    .attr('r', 20)
    .style('fill', d => color(d.group))
    .call(d3.drag()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded)
    );

  function ticked() {
    links
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    nodes
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  function dragStarted() {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }

  function dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  function dragEnded() {
    if (!d3.event.active) simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

}
