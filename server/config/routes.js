'use strict';
var config = require('./config'),
    users = require('../controllers/users'),
    messages = require('../controllers/messages'),
    auth = require('./../utils/auth');

module.exports = function(app, config) {

  var apiRoute = '/api/'+ config.api;

  // Users
  app.post(apiRoute+'/users', users.createUser);

  // Messages
  app.get(apiRoute+'/chat', messages.getMessages);
  app.post(apiRoute+'/chat', messages.submitMessage);

  // Auth
  app.post('/login', auth.authenticate);
  app.post('/logout', auth.logout)

  app.get('/partials/*', function(req, res, next){
    res.render('../../public/partials/' + req.params[0]);
  });

  app.get('*', function(req, res) {
    res.render('index', {
      currentUser:req.user
    });
  });

};