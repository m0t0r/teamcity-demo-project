'use strict';
var User = require('mongoose').model('User'),
    encryption = require('./../utils/encryption');

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

exports.createUser = function(req, res, next) {
  var userData = req.body;
  userData.username = userData.username.toLowerCase();
  userData.salt = encryption.createSalt();
  userData.hashedPassword = encryption.hashPassword(userData.salt, userData.password);

  User.create(userData, function(err, user) {
    if(err){
      if(err.toString().indexOf('E11000') >-1){
        err = new Error('Duplicate username');
      }
      res.status(400);
      res.end(err.toString());
    }
    req.logIn(user, function(err) {
      if(err) {
        return next(err);
      }
      res.send(user);
    })
  });
};

