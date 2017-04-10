const relationEntities = new Array(50).fill(undefined).map((_, index) => {
  return {
    id: index,
    entity2: `Entity${(index + 7) % 25}`,
    source: {
      text: `Source text${index}`,
      url: `Source url${index}`,
    },
  };
});

export default function loadRelationEntities(relation) { // eslint-disable-line
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        relationEntities,
      });
    }, 750);
  });
}
