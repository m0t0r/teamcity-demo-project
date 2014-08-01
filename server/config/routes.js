'use strict';
var config = require('./config'),
    users = require('../controllers/users'),
    auth = require('./auth'),
    router = require('express').Router();

module.exports = function(app, config) {

  var apiRoute = '/api/'+ config.api;

  // Users
  //router.get(apiRoute+'/users', function(req, res, next) {
  //  users.getUser(req, res, next);
  //});

  // Auth
  app.post('/login', auth.authenticate);
  app.post('/logout', auth.logout)

  app.get('/partials/*', function(req, res, next){
    res.render('../../public/app/' + req.params[0]);
  });

  app.get('*', function(req, res) {
    res.render('index', {
      currentUser:req.user
    });
  });

};