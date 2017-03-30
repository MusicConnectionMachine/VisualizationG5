const entitiesSuggestions = [
  { title: 'Compos', type: 'composer' },
  { title: 'Composer', type: 'composer' },
  { title: 'Composer1', type: 'composer' },
];

const relationsSuggestions = [
  { title: 'Lik' },
  { title: 'Likes' },
  { title: 'Likes very m' },
];


export default function loadSuggestions(query = '') { // eslint-disable-line no-unused-vars
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        entitiesSuggestions,
        relationsSuggestions,
      });
    }, 750);
  });
}
