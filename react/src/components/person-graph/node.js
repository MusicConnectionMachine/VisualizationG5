import * as d3 from 'd3';


export function setupNode(container, data, fontSize = 12, nodeRadius = 60) {
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const nodeRadiusGroup = 1.2 * nodeRadius;

  const node = container.append('g')
    .attr('class', 'nodes')
    .selectAll('.node')
    .data(data.nodes)
    .enter().append('g')
    .attr('class', d => 'node node--' + d.nodeType);

  node.append('circle')
    .attr('r', d => d.nodeType === 'group' ? nodeRadiusGroup : nodeRadius)
    .style('fill', d => color(d.nodeType));

  node.append('text')
    .attr('class', 'label')
    .attr('text-anchor', 'middle')
    .attr('font-size', fontSize)
    .attr('fill', 'white')
    .style('fill-opacity', 1)
    .style('display', 'inline')
    .text(d => d.name);

  // Initialize children nodes inside nodes of type 'group'
  node.each((nodeData, index, elems) => {
    if (nodeData.nodeType !== 'group') {
      // Other types don't have children, skip initialization
      return;
    }

    const diameter = nodeRadiusGroup * 2;
    const margin = 5;

    const hierarchy = d3.hierarchy(nodeData)
      .sum(d => d.relationStrength)
      .sort((a, b) => b.value - a.value);

    const pack = d3.pack()
      .size([diameter - margin, diameter - margin])
      .padding(2);

    const nodes = pack(hierarchy).descendants();

    const circle = d3.select(elems[index]).selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('class', 'node node--leaf')
      .style('fill-opacity', 0);

    d3.select(elems[index]).selectAll('text')
      .data(nodes)
      .enter().append('text')
      .attr('class', 'label label--leaf')
      .attr('text-anchor', 'middle')
      .attr('font-size', fontSize / 4)
      .attr('fill', 'black')
      .style('fill-opacity', 0)
      .style('display', 'inline')
      .text(d => d.data.name);

    // Multiplier to keep margin between elements
    const k = diameter / (diameter + margin);
    // Set the appropriate circle size
    circle.attr('r', d => d.r * k);
    // Translate both circle and text to their location inside parent
    d3.select(elems[index]).selectAll('text, circle').attr('transform', d =>
      'translate(' + (d.x - diameter / 2) * k + ',' + (d.y - diameter / 2) * k + ')'
    );
  });

  node.exit().remove();

  return node;
}
