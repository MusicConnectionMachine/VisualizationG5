const express = require('express');
const router = express.Router();
const services = require('../services/');


router.get('/', (req, res, next) => {
  const query = req.query.q;
  if (!query) {
    res.redirect('/');
    return;
  }
  services.elasticsearchService.search(query).then(hits => res.render('search', { query, hits }));
});


module.exports = router;
