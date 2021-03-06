const relations = new Array(50).fill(undefined).map((_, index) => {
  return {
    id: index,
    entity1: 'Mozart',
    relation: `relationX to`,
    entity2: `Entity${(index + 7) % 25}`,
    sources: [{
      id: 1,
      text: `Source text${index}`,
      url: `Source url${index}`,
    }],
  };
});

export default function loadRelationEntities(relation) { // eslint-disable-line
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        relations,
      });
    }, 750);
  });
}
