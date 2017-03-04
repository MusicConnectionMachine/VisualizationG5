const express = require('express');
const musicians = require('../../../mock_data/musician.json');
const router = express.Router();

/* GET musicians listing. */
router.get('/', (req, res, next) => {
  res.send(musicians);
});

module.exports = router;
