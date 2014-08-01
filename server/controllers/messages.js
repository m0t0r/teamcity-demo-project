'use strict';
var Message = require('mongoose').model('Message');

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

