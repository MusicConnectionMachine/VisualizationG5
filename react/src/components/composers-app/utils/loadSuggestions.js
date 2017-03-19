const suggestions = [
  { title: 'Compos' },
  { title: 'Composer' },
  { title: 'Composer1' },
];

export default function loadSuggestions(query = '') { // eslint-disable-line no-unused-vars
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        suggestions,
      });
    }, 750);
  });
}
