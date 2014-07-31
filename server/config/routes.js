'use strict';
var config = require('./config')


module.exports = function(app, config) {

  var apiRoute = '/api/'+ config.api;



  app.get('/partials/*', function(req, res){
    res.render('../../public/app/' + req.params[0]);
  });

  app.get('*', function(req, res) {
    res.render('index', {
      currentUser:req.user
    });
  });

};