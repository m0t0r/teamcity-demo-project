'use strict';
var Message = require('mongoose').model('Message');

exports.getMessages = function(req, res) {
  Message.find({}, '-__v', function(err, collection) {
    if(err) res.send(err);
    res.send(collection);
  });
};

exports.submitMessage = function(req, res) {
  var msgData = req.body;
  Message.create(msgData, function(err, msg) {
    if(err){
      res.status(400);
      res.end(err.toString());
    }
    res.send(msg);
  });
};

