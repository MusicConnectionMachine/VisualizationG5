const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  const query = req.query.q;
  if (!query) {
    res.redirect('/');
    return;
  }
  res.render('search', { query });
});


module.exports = router;
