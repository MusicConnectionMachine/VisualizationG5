const entities = new Array(100).fill(undefined).map((_, index) => {
  return {
    title: `Composer${index}`,
    type: new Array('Composer', 'Music Piece', 'Work')[Math.floor(Math.random() * 10) % 3],
  };
});

export default function loadEntites(relationSuggestion) { // eslint-disable-line no-unused-vars
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        entities,
      });
    }, 750);
  });
}
