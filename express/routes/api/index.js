const
  express = require('express'),
  router = express.Router(),
  composers = require('./composers'),
  musicians = require('./musicians'),
  works = require('./works');


router.use('/composers', composers);
router.use('/musicians', musicians);
router.use('/works', works);


module.exports = router;
