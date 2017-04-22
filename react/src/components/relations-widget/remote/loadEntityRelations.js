const relations = new Array(50).fill(undefined).map((_, index) => {
  return {
    id: index,
    entity1: 'Mozart',
    relation: `Relation${(index + 7) % 25}`,
    entity2: 'EntityX',
    sources: [{
      id: 1,
      text: `Source text${index}`,
      url: `Source url${index}`,
    }],
  };
});

export default function loadEntityRelations(entity) { // eslint-disable-line
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        relations,
      });
    }, 750);
  });
}
