const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const httplogger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const insertToElasticSearch = require('./utils/insertToElasticSearch');

const index = require('./routes/index');
const composers = require('./routes/composers');
const musicians = require('./routes/musicians');
const works = require('./routes/works');

const app = express();

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

// setup Routes
app.use('/', index);
app.use('/api/v1/composers', composers);
app.use('/api/v1/musicians', musicians);
app.use('/api/v1/works', works);

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
