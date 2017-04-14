const entity2Relations = new Array(50).fill(undefined).map((_, index) => {
  return {
    id: index,
    relation: `Relation${(index + 7) % 25}`,
    source: {
      text: `Source text${index}`,
      url: `Source url${index}`,
    },
  };
});

export default function loadEntityRelations(entity) { // eslint-disable-line
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        entity2Relations,
      });
    }, 750);
  });
}
