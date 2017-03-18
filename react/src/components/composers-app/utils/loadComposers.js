const composers = new Array(100).fill(undefined).map((_, index) => {
  return {
    title: `Composer${index}`,
  };
});

export default function loadComposers(page = 1, { limit = 15, query = '' } = {}) {
  return new Promise(resolve => {
    const begin = (page - 1) * 15;
    const end = begin + limit;
    const filteredComposers = composers.filter(entity => entity.title.toLowerCase().includes(query.toLowerCase()));

    resolve({
      composers: filteredComposers.slice(begin, end),
      composersTotalCount: filteredComposers.length,
    });
  });
}
