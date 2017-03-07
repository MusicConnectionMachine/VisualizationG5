const express = require('express');
const router = express.Router();
const apiRoute = require('./api/');
const searchRoute = require('./search');


router.use('/api/v1/', apiRoute);
router.use('/search', searchRoute);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'MusicConnectionMachine' });
});


module.exports = router;
