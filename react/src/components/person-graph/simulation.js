/* eslint-disable no-use-before-define */
import * as d3 from 'd3';


export function setupSimulation(data, link, node, width = 800, height = 800) {
  const linkDistance = 180;
  const manyBodyStrength = -3000;

  const simulation = d3.forceSimulation(data.nodes)
    .force('charge', d3.forceManyBody().strength(manyBodyStrength))
    .force('link', d3.forceLink(data.links).distance(linkDistance).id(d => d.id))
    .force('x', d3.forceX(width / 2))
    .force('y', d3.forceY(height / 2))
    .on('tick', ticked);

  function ticked() {
    link.selectAll('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    link.selectAll('text')
      .attr('x', d => linkTextXPos(d.source, d.target))
      .attr('y', d => linkTextYPos(d.source, d.target));

    node.attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');
  }

  function linkTextXPos(source, target) {
    const angle = Math.atan2(target.y - source.y, target.x - source.x);
    return (linkDistance / 2) * Math.cos(angle) + source.x;
  }

  function linkTextYPos(source, target) {
    const angle = Math.atan2(target.y - source.y, target.x - source.x);
    return (linkDistance / 2) * Math.sin(angle) + source.y;
  }

  return simulation;
}
