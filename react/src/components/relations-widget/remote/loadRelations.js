const relations = new Array(50).fill(undefined).map((_, index) => {
  return {
    id: index,
    entity1: 'Mozart',
    relation: `relation${index % 10} to`,
    entity2: `Entity${(index + 7) % 25}`,
    sources: [
      {
        id: 1,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sagittis nunc a nisi consectetur, suscipit fringilla mi vestibulum. Donec pellentesque`,
        url: `http://example.com/`,
      },
      {
        id: 2,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sagittis nunc a nisi consectetur, suscipit fringilla mi vestibulum. Donec pellentesque`,
        url: `http://example.com/`,
      },
      {
        id: 3,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sagittis nunc a nisi consectetur, suscipit fringilla mi vestibulum. Donec pellentesque`,
        url: `http://example.com/`,
      },
    ],
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
