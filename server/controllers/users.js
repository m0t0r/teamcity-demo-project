'use strict';
//var User = require('./../models/user').User,
var User = require('mongoose').model('User');

exports.getUser = function(req, res, next){
  if(req.params && req.params.id) {
    var userId = req.params.id;
    User.findOne({_id:userId}, '-salt -hashedPassword -__v', function(err, user) {
      if(err) res.send(err.toString());
      res.send(user);
      next();
    });
  } else {
    res.status(404);
    return res.end()
  }
};



