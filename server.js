'user strict';

var express = require('express');


// set environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config')[env];

var app = express();

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app, config);

app.listen(config.port);

module.exports = app;
