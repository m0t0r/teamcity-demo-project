'use strict';
var passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
  passport.use(new localStrategy(
    function(username, password, done) {
      User.findOne({username:username}, function(err, user) {
        if(err) {
          return done(err);
        }
        if(user && user.authenticate(password)){
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    if(user){
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}, '-hashedPassword -salt -__v').exec(function(err, user){
      if(err) {
        return done(err);
      }
      if(!user){
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
  });
}