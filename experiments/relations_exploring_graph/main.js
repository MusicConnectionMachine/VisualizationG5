class Chart {
  /**
   *
   * @param svgSelector
   * @param {string} [forceMode = 'charge'] - There are two available modes: 'collide' and 'charge'
   */
  constructor(svgSelector, forceMode = 'charge') {
    const svg = d3.select(svgSelector);
    this.svg = svg;
    this.forceMode = forceMode;

    /**
     * Maps a relation type to an object containing meta data (e.g., the color of the bubbles) of that relation
     * @type {Map.<string, Object>}
     */
    this.relationTypes = new Map();
    this.nodes = [];
    this.force = null;

    this._colorGenerator = (function* () {
      const colors = d3.schemeCategory10;
      let i = 0;
      while(true) {
        yield colors[i];
        i = (i + 1) % colors.length;
      }
    })();

    this._initialPositionGenerator = (function* () {
      const width = +svg.attr("width");
      const height = +svg.attr("height");
      const positions = [
        { x: -50, y: -50 },
        { x: width + 50, y: -50 },
        { x: -50, y: height + 50 },
        { x: width + 50, y: height + 50 },
      ];
      let i = 0;
      while(true) {
        yield positions[i];
        i = (i + 1) % positions.length;
      }
    })();
  }


  _createTooltips() {
    // TODO Delete old tooltips
    this.nodes.forEach((node) => {
      new Tooltip(document.getElementById('bubble-' + node.id),  {
        title: node.term1 + ' ' + node.relation + ' ' + node.term2,
        container: document.getElementById('container'),
        template: `<div class="tooltip"><h5 class="tooltip-inner"></h5><p>${node.sentence}</p></div>`
      });
    })
  }


  _getNextColor() {
    return this._colorGenerator.next().value;
  }


  _getNextInitialPosition() {
    return this._initialPositionGenerator.next().value;
  }


  _prepareData(relations) {
    const svg = this.svg;
    const radiusScale = d3.scaleLinear().range([30, 50]).domain([0, 1]);

    const nodes = relations.map((relation) => {
      // Define meta information about a relation if the relation is new.
      if (!this.relationTypes.has(relation.relation)) {
        this.relationTypes.set(relation.relation, {
          color: this._getNextColor()
        });
      }

      // Create the actual node objects for the chart
      const node = Object.assign({}, relation);
      // The init positions
      const pos = this._getNextInitialPosition();
      node.x = pos.x;
      node.y = pos.y;
      node.radius = radiusScale(Math.random()); // Later, more meaningful weights should be used..
      return node;
    });
    this.nodes = this.nodes.concat(nodes);
  }


  /**
   *
   * @param {Array.<Relation>} relations
   */
  addBubbles(relations) {
    const svg = this.svg;
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const xScale = d3.scaleLinear().range([150, width - 150]).domain([0, 1]);
    const yScale = d3.scaleLinear().range([120, height - 120]).domain([0, 1]);
    this._prepareData(relations);
    const nodes = this.nodes;

    const bubbles = svg.selectAll('.bubble')
      .data(nodes, d => d.id)
      .enter()
      .append('g')
      .classed('bubble', true)
      .attr('id', d => 'bubble-' + d.id);
    const circles = bubbles.append('circle')
      .attr('id', d => 'circle-' + d.id)
      .attr('r', d => d.radius)
      .attr('fill', '#efefef')
      .attr('stroke', d => this.relationTypes.get(d.relation).color)
      .attr('stroke-width', 4);
    bubbles.append("clipPath")
      .attr('id', d => 'clip-' + d.id)
      .append('use')
      .attr('xlink:href', d => '#circle-' + d.id);
    const texts = bubbles.append('text')
      .attr('clip-path', d => `url(#clip-${d.id})`);
    texts.selectAll('tspan')
      .data(d => {
        const words = d.term1.split(' ');
        if (words.length > 5) {
          return words.slice(0,4).concat('...');
        }
        return words;
      })
      .enter()
      .append('tspan')
      .attr('x', 0)
      .attr('y', (d, i, nodes) => 13 + (i - nodes.length / 2 - 0.5) * 10) // Formula from https://bl.ocks.org/mbostock/4063269
      .text(d => d);

    // Add force
    const ticked = () => {
      bubbles.each(node => {})
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    };
    let forceFunction;
    switch (this.forceMode) {
      case 'charge':
        forceFunction = d3.forceManyBody()
          .strength(d => -Math.pow(d.radius, 2.0) * 0.04);
        break;
      case 'collide':
        forceFunction = d3.forceCollide()
          .radius(d => d.radius + 0.5)
          .strength(1)
          .iterations(6);
        break;
      default:
        throw new Error('Unknown force mode.');
    }
    const force = d3.forceSimulation()
      .nodes(nodes)
      .velocityDecay(0.3)
      .on('tick', ticked)
      .force(this.forceMode, forceFunction)
      .force('x', d3.forceX(d => xScale(Math.random())).strength(0.03))
      .force('y', d3.forceY(d => yScale(Math.random())).strength(0.03));

    force.alphaTarget(1).restart();
    this.force = force;

    this._createTooltips();
  }


  /**
   *
   * @param {Array.<Relation>} relations
   */
  removeBubbles(relations) {
    const svg = this.svg;
    const animationDuration = 1000;
    relations.forEach(relation => {
      d3.select('#circle-' + relation.id)
        .transition()
        .duration(animationDuration)
        .attr('r', 0);
      d3.select('#bubble-' + relation.id)
        .transition()
        .delay(animationDuration)
        .remove();
    });
    this.nodes = Utils.differenceById(this.nodes, relations);
  }
}


class Utils {
  /**
   * array1 \ array2
   * @param array1
   * @param array2
   */
  static differenceById(array1, array2) {
    const idsInArray2 = new Set(array2.map(obj => obj.id));
    return array1.filter(obj => !idsInArray2.has(obj.id));
  }
}


let chart, service, relations;
async function main() {
  // Load data
  service = new DataService();
  await service.loadData();
  relations = service.getRelations(20);

  // Init chart
  chart = new Chart('svg');
  chart.addBubbles(relations);

  // Init control bar
  new Awesomplete('#container input', {
    list: Array.from(service.relationTypes),
    filter: Awesomplete.FILTER_CONTAINS
  });

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const newRelations = service.getRelations(20, searchInput.value);
      chart.removeBubbles(Utils.differenceById(relations, newRelations));
      chart.addBubbles(Utils.differenceById(newRelations, relations));
      relations = newRelations;
    }
  });
}


main();
