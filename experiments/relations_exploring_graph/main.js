
class DataService {
  constructor() {
    this.relations = null;
    this.relationTypes = null;
  }


  async loadData() {
    const sentences = await fetch('open_ie.txt').then(res => res.json());
    this.relations = [];
    this.relationTypes = new Set();
    let idCounter = 0;
    sentences.forEach((sentence) => {
      const s = sentence.sentence;
      sentence.instances.forEach((instance) => {
        if (!instance.term1 || !instance.term2 || !instance.relation || !typeof instance.quality === 'number') {
          return;
        }
        this.relationTypes.add(instance.relation);
        instance.sentence = s;
        instance.id = idCounter++;
        this.relations.push(instance);
      });
    });
    this.relations.sort((r1, r2) => r2.quality - r1.quality);
  }


  getRelations(number, filterQuery) {
    let rs = this.relations;
    if (filterQuery) {
      rs = rs.filter(r => r.sentence.toLowerCase().includes(filterQuery));
    }
    return rs.slice(0, number);
  }
}

class Chart {
  constructor(relations, relationTypes, svg) {
    this.relations = relations;
    this.relationTypes = relationTypes;
    this.svg = svg;
    this.force = null;
    this.initChart();
  }


  initChart() {
    const svg = this.svg;
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const radiusScale = d3.scaleLinear().range([30, 50]).domain([0, 1]);
    const xScale = d3.scaleLinear().range([150, width - 150]).domain([0, 1]);
    const yScale = d3.scaleLinear().range([120, height - 120]).domain([0, 1]);
    const colorScale = d3.scaleOrdinal().range(d3.schemeCategory10).domain(Array.from(this.relationTypes));

    // Prepare data
    const nodes = this.relations.map((relation) => {
      const node = Object.assign({}, relation);
      // The init positions
      node.x = Math.random() * width;
      node.y = Math.random() * height;
      node.radius = radiusScale(Math.random()); // Later, more meaningful weights should be used..
      return node;
    });

    // Create bubbles
    const bubbles = svg.selectAll('.bubble')
      .data(nodes, d => d.id)
      .enter()
      .append('g');
    const circles = bubbles.append('circle')
      .attr('id', d => 'circle-' + d.id)
      .attr('r', d => d.radius)
      .attr('fill', '#efefef')
      .attr('stroke', d => colorScale(d.relation))
      .attr('stroke-width', 4)
      .classed('bubble', true);
    bubbles.append("clipPath")
      .attr('id', d => 'clip-' + d.id)
      .append('use')
      .attr('xlink:href', d => '#circle-' + d.id);
    const texts = bubbles.append('text')
      .attr('clip-path', d => `url(#clip-${d.id})`);
    texts.selectAll('tspan')
      .data(d => d.term1.split(' '))
      .enter()
      .append('tspan')
      .attr('x', 0)
      .attr('y', (d, i, nodes) => {
        console.log(d, i, nodes);
        return 13 + (i - nodes.length / 2 - 0.5) * 10; // Formula from https://bl.ocks.org/mbostock/4063269
      })
      .text(d => d);

    // Add force
    const charge = d => -Math.pow(d.radius, 2.0) * 0.04;
    const ticked = () => {
      bubbles.each(node => {})
        // .attr("cx", d => d.x)
        // .attr("cy", d => d.y)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    };
    const collideForce = d3.forceCollide()
      .radius(d => d.radius + 0.5)
      .strength(1)
      .iterations(6);
    const force = d3.forceSimulation()
      .nodes(nodes)
      .velocityDecay(0.3)
      .on('tick', ticked)
      .force('charge', d3.forceManyBody().strength(charge))
      // .force('collide', collideForce)
      // .force('x', d3.forceX(width / 2).strength(0.03))
      // .force('y', d3.forceY(height / 2).strength(0.03))
      .force('x', d3.forceX(d => xScale(Math.random())).strength(0.03))
      .force('y', d3.forceY(d => yScale(Math.random())).strength(0.03))
      ;

    force.alphaTarget(1).restart();
    this.force = force;
    console.log(nodes);
  }
}

let chart, service;
async function main() {
  service = new DataService();
  await service.loadData();
  const relations = service.getRelations(20);

  const svg = d3.select("svg");
  chart = new Chart(relations, service.relationTypes, svg);
  console.log('Finished');
}


main();
