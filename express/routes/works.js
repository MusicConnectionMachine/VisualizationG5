const express = require('express');
const works = require('../../mock_data/work.json');
const router = express.Router();

/* GET works listing. */
router.get('/', (req, res, next) => {
  res.send(works);
});

module.exports = router;
