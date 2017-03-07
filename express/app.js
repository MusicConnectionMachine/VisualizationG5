const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const httplogger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const insertToElasticSearch = require('./utils/insertToElasticSearch');

const index = require('./routes/');

const app = express();
app.locals.serverApiUrl = process.env.SERVER_API_URL || 'http://localhost:3000/api/v1';

// Allow cors requests except for production (for instance, in development)
if (app.get('env') !== 'production') {
  app.use(cors());
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(httplogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
// Make React Resources available
app.use('/react', express.static(path.join(__dirname, 'react')));

// setup Routes
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

logger.info('Server running in %s environment', app.get('env'));
insertToElasticSearch();

module.exports = app;
