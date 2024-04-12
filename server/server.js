var debug = require('debug')('server:server');
var http = require('http');
var app = require('./app');

/**
 * Get port from environment and store in Express.
 */
var PORT = process.env.PORT || '5000';
/**
 * Listen on provided port, on all network interfaces.
 */
const db = require('./models/');
db.sequelize
  .sync() // {force:true}
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server running on localhost:' + PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  });
