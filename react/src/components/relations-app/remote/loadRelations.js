const relations = new Array(100).fill(undefined).map((_, index) => {
  return {
    title: `Relation${index}`,
  };
});

export default function loadRelations(entitySuggestion) { // eslint-disable-line no-unused-vars
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        relations,
      });
    }, 750);
  });
}
