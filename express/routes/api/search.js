const express = require('express');
const router = express.Router();
const elasticsearchService = require('../../services/').elasticsearchService;


/* GET composers listing. */
router.get('/', (req, res, next) => {
  const query = req.query.query;
  const mode = req.query.mode || 'search';
  if (!query) {
    res.send({
      error: 'Missing parameter'
    });
    return;
  }
  if (mode === 'auto-suggest') {
    elasticsearchService.autoSuggestionSearch(query, [
      'name', 'title', 'part_of', 'birthplace', 'deathplace'
    ]).then(hits => res.send(hits));
  } else if (mode === 'search') {
    elasticsearchService.search(query).then(hits => res.send(hits));
  } else {
    res.send({
      error: 'Unknown mode'
    });
  }
});


module.exports = router;
