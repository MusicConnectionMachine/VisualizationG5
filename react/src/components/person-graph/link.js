export function setupLink(container, data, fontSize = 12) {
  const link = container.append('g')
		.attr('class', 'links')
		.selectAll('.link')
		.data(data.links)
		.enter().append('g')
		.attr('class', 'link');

  link.append('line')
		.style('stroke-width', d => Math.sqrt(d.value));

  link.append('text')
		.attr('text-anchor', 'middle')
		.attr('font-size', fontSize)
		.attr('fill', 'black')
		.text(d => d.name);

  link.exit().remove();

  return link;
}
