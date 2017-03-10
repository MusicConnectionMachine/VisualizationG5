/* eslint-disable no-use-before-define */
import * as d3 from 'd3';
import { data } from './graphData';
import { setupSimulation } from './simulation';
import { setupLink } from './link';
import { setupNode } from './node';
import { nodeIsClickable } from './utilityFunctions';


export default function drawGraph(targetContainer) {
  const width = 1000;
  const height = 800;

  const svg = d3.select(targetContainer).append('svg')
    .attr('width', width)
    .attr('height', height);

  const container = svg.append('g');

  const link = setupLink(container, data);
  const node = setupNode(container, data);
  const simulation = setupSimulation(data, link, node, width, height);

  // --------- Zoom ------------

  // Do node that we're currently zoomed in to (or null otherwise)
  let zoomTarget;

  const zoom = d3.zoom().on('zoom', () => {
    container.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
  });

  // Initiate zoom-in / zoom-out on double click
  node.on('dblclick', (target, index, nodes) => {
    if (!nodeIsClickable(target)) return;

    if (!zoomTarget) {
      zoomTarget = target;
      const clickedNode = nodes[index];

      // Global zoom transform
      svg.transition()
        .duration(1250)
        .call(zoom.transform, d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(6)
            .translate(-zoomTarget.x, -zoomTarget.y));

      // Fade out node text
      d3.select(clickedNode).select('text').transition()
        .duration(1250)
        .style('fill-opacity', 0);

      // Fade in the children nodes
      d3.select(clickedNode).selectAll('.node--leaf, .label--leaf').transition()
        .delay(500)
        .duration(750)
        .style('fill-opacity', 1);
    } else {
      zoomTarget = null;
      const clickedNode = nodes[index];

      // Global zoom transform back to zoom identity
      svg.transition()
        .duration(1250)
        .call(zoom.transform, d3.zoomIdentity);

      // Fade in node text
      d3.select(clickedNode).select('text').transition()
        .duration(1250)
        .style('fill-opacity', 1);

      // Fade out children
      d3.select(clickedNode).selectAll('.node--leaf, .label--leaf').transition()
        .duration(750)
        .style('fill-opacity', 0);
    }
  });

  // --------- Drag ------------
  node.call(d3.drag()
    .on('start', dragStarted)
    .on('drag', dragged)
    .on('end', dragEnded)
  );

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
