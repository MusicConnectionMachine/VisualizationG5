const express = require('express');
const router = express.Router();
const composers = require('./composers');
const musicians = require('./musicians');
const works = require('./works');
const search = require('./search');


router.use('/composers', composers);
router.use('/musicians', musicians);
router.use('/works', works);
router.use('/search', search);


module.exports = router;
