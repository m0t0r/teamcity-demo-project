'use strict';
var mongoose = require('mongoose'),
    userModel = require('../models/user'),
    messagesModel = require('../models/message');


module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function() {
    console.log('db connection is open...');
  });

  userModel.createDefaultUsers();

};