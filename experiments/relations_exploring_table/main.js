const FONT_SIZE = 14;
const FONT_FAMILY = 'Georgia';


class Chart {
  constructor(svgSelector) {
    this.svg = d3.select(svgSelector);
  }


  setRelations(relations) {
    // delete all old entries
    this.svg.selectAll('.entry').data([]).exit().remove();
    this.svg.selectAll('.connection').data([]).exit().remove();

    const relationshipComponents = new Map(relations.map(r => [r.id, {}]));

    // Prepare the entries (term1, term2 and relation)
    const prepareEntry = (typeName, attributeName, maxCharacters, xOffset) => {
      const map = new Map();
      let rowCounter = 0;
      relations.sort((a, b) => a.term1 > b.term1);
      relations.forEach((r) => {
        const term = r[attributeName];
        if (!map.has(term)) {
          const o = {
            type: typeName,
            row: rowCounter,
            text: term,
            tooltip: null,
            relation: r,
          };
          if (term.length > maxCharacters) {
            o.text = `${term.slice(0, maxCharacters - 4)}...`;
            o.tooltip = `...${term.slice(maxCharacters - 4)}`;
          }
          o.x = 2 + xOffset;
          o.y = 5 + (30 * rowCounter);
          o.height = 20;
          o.width = Utils.getTextWidth(o.text) + 10;
          o.tspanX = o.width / 2;
          o.tspanY = 15;
          o.rectId = `rect-${o.type}-${o.row}`;
          o.clipId = `clip-${o.type}-${o.row}`;
          map.set(term, o);
        }
        rowCounter += 1;
        relationshipComponents.get(r.id)[typeName] = map.get(term).row;
      });
      return map;
    };
    const subjects = prepareEntry('subject', 'term1', 30, 0);
    const predicates = prepareEntry('predicate', 'relation', 15, 225);
    const objects = prepareEntry('object', 'term2', 78, 365);

    // Prepare the connections / lines between the entries
    const connections = new Map();
    let connectionIdCounter = 0;
    relations.forEach((r) => {
      const { term1, term2, relation } = r;
      const subject = subjects.get(term1);
      const predicate = predicates.get(relation);
      const object = objects.get(term2);
      // it seems to be convention to swap x and y here - for whatever reason..
      const connectionNameSP = `s${subject.row}---p${predicate.row}`;
      const connectionNamePO = `p${predicate.row}---o${object.row}`;
      if (!connections.has(connectionNameSP)) {
        connections.set(connectionNameSP, {
          source: { y: subject.x + subject.width, x: subject.y + (subject.height / 2) },
          target: { y: predicate.x, x: predicate.y + (predicate.height / 2) },
          relation: r,
          id: connectionIdCounter++,
        });
      }
      if (!connections.has(connectionNamePO)) {
        connections.set(connectionNamePO, {
          source: { y: predicate.x + predicate.width, x: predicate.y + (predicate.height / 2) },
          target: { y: object.x, x: object.y + (object.height / 2) },
          relation: r,
          id: connectionIdCounter++,
        });
      }
    });

    const handleRelation = (r, functionName) => {
      const { subject, predicate, object } = relationshipComponents.get(r.id);
      $(`#subject-${subject}`)[functionName]('entry--highlight');
      $(`#predicate-${predicate}`)[functionName]('entry--highlight');
      $(`#object-${object}`)[functionName]('entry--highlight');

      const connection1 = connections.get(`s${subject}---p${predicate}`).id;
      const connection2 = connections.get(`p${predicate}---o${object}`).id;
      $(`#connection-${connection1}`)[functionName]('connection--highlight');
      $(`#connection-${connection2}`)[functionName]('connection--highlight');
    };

    const highlightRelation = (r) => {
      handleRelation(r, 'addClass');
    };

    const unHighlightRelation = (r) => {
      handleRelation(r, 'removeClass');
    };

    // Draw the lines
    this.svg.selectAll('.connection')
      .data([...connections.values()])
      .enter().append('path')
      .attr('class', 'connection')
      .attr('id', d => `connection-${d.id}`)
      .attr('d', d => `M${d.source.y},${d.source.x
           }C${(d.source.y + d.target.y) / 2},${d.source.x
           } ${(d.source.y + d.target.y) / 2},${d.target.x
           } ${d.target.y},${d.target.x}`)
      .on('mouseover', d => highlightRelation(d.relation))
      .on('mouseout', d => unHighlightRelation(d.relation));

    // Draw the entries
    const drawEntries = (dataMap, type) => {
      const entries = this.svg.selectAll(`.${type}-entry`)
        .data([...dataMap.values()], d => d.row)
        .enter()
        .append('g')
        .classed(`.${type}-entry`, true)
        .classed('entry', true)
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .attr('id', d => `${type}-${d.row}`)
        .on('mouseover', d => highlightRelation(d.relation))
        .on('mouseout', d => unHighlightRelation(d.relation));
      const links = entries.append('a')
        .attr('href', '#')
        .on('click', d => console.log(`Filter for ${d.type} "${d.text}"`)); // TODO
      links.append('rect')
        .attr('height', d => d.height)
        .attr('width', d => d.width)
        .attr('rx', 5)
        .attr('ry', 5)
        .attr('id', d => d.rectId);
      links.append('clipPath')
        .attr('id', d => d.clipId)
        .append('use')
        .attr('href', d => `#${d.rectId}`);
      links.append('text')
        .attr('clip-path', d => `url(#${d.clipId})`)
        .attr('font-family', FONT_FAMILY)
        .attr('font-size', FONT_SIZE)
        .append('tspan')
        .attr('x', d => d.tspanX)
        .attr('y', d => d.tspanY)
        .text(d => d.text);
    };
    drawEntries(subjects, 'subject');
    drawEntries(predicates, 'predicate');
    drawEntries(objects, 'object');
  }
}


class Utils {
  static getTextWidth(text) {
    const a = document.createElement('canvas');
    const b = a.getContext('2d');
    b.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
    return b.measureText(text).width;
  }
}


let chart;
let service;
let relations;
async function main() {
  service = new DataService();
  await service.loadData();
  relations = service.getRelations(8);
  chart = new Chart('svg');
  chart.setRelations(relations);
  $('#searchInput').on('input', (e) => {
    chart.setRelations(service.getRelations(8, e.currentTarget.value, { notFilterSentence: true }));
  });
}


main();
