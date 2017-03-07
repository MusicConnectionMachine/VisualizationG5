const express = require('express');
const composers = require('../../../mock_data/composer.json');
const router = express.Router();

/* GET composers listing. */
router.get('/', (req, res, next) => {
  res.send(composers);
});

module.exports = router;
