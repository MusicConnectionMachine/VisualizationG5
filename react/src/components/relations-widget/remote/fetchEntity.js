function fetchEntity(title) {
  const url = `http://mcmapi.azurewebsites.net/search/entities?q=${title}&limit=1`;

  return fetch(url, {
    headers: {
      'API-KEY': 123,
    },
  });
}

export default fetchEntity;