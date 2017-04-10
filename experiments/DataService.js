/**
 * @typedef {Object} Relation
 * @property {string} term1
 * @property {string} term2
 * @property {string} relation
 * @property {number} quality
 * @property {string} sentence
 */


class DataService {
  constructor() {
    this.relations = null;
    this.relationTypes = null;
  }


  async loadData() {
    const sentences = await fetch('/open_ie.txt').then(res => res.json());
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


  getRelations(number, filterQuery, options) {
    let rs = this.relations;
    if (filterQuery) {
      const query = filterQuery.toLowerCase();
      if (options && !options.notFilterSentence) {
        rs = rs.filter(r => r.sentence.toLowerCase().includes(query));
      } else {
        rs = rs.filter(r => r.term1.toLowerCase().includes(query)
        || r.term2.toLowerCase().includes(query)
        || r.relation.toLowerCase().includes(query));
      }
    }
    return rs.slice(0, number);
  }
}
