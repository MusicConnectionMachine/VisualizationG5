const relations = new Array(50).fill(undefined).map((_, index) => {
  return {
    id: index,
    entity1: 'Mozart',
    relation: `relation${index % 10} to`,
    entity2: `Entity${(index + 7) % 25}`,
    source: {
      text: `Source text${index}`,
      url: `Source url${index}`,
    },
  };
});

export default function loadRelations(entity) { // eslint-disable-line no-unused-vars
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        relations,
      });
    }, 750);
  });
}
