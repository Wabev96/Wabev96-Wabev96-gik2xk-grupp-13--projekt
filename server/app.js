var express = require('express');
var logger = require('morgan');
const cors = require('cors');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/users', require('./routes/usersRoute'));
app.use('/cart', require('./routes/cartsRouter'));
app.use('/products', require('./routes/productsRoute'));

app.use('*', function (req, res, next) {
  res.status(404).json({ error: 'Not found' });
});
/// error handlers
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ error: err.message });
});
module.exports = app;
