const express = require('express');
const router = express.Router();
const elasticsearchService = require('../../services/').elasticsearchService;


/* GET composers listing. */
router.post('/', (req, res, next) => {
  if (!req.body.query) {
    res.send({
      error: 'Missing parameter'
    });
    return;
  }
  elasticsearchService.autoSuggestionSearch(req.body.query, [
    'name', 'title', 'part_of', 'birthplace', 'deathplace'
  ]).then(function (hits) {
    res.send(hits);
  });
});


module.exports = router;
