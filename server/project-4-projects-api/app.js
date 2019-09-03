var express = require('express');
var cors = require('cors');
var knex = require('knex')('./knexfile.js');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');

var corsOptions = {
    origin: 'http:localhost:3000',
    optionSuccessState: 200
}

//Logging requests
logger.token('req', (req, res) => JSON.stringify(req.headers))
logger.token('res', (req, res) => {
  const headers = {}
  res.getHeaderNames().map(h => headers[h] = res.getHeader(h))
  return JSON.stringify(headers)
})

var app = express();

app.use((req, res, next) => {
    req.db = knex;
    next();
})

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);

module.exports = app;
