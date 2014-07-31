'use strict';
var express = require('express'),
    passport = require('passport'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    session = require('express-session');

module.exports = function(app, config) {
  function compile(str, path) {
    return stylus(str).set('filename',path);
  };

  app.set('views', config.rootPath + 'server/views');
  app.set('view engine', 'jade');
  app.use(require('morgan')('dev'));
  app.use(require('cookie-parser')());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json())
  app.use(session({
    secret: 'teamcity-demo-project',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(stylus.middleware(
    {
      src:config.rootPath + '/public',
      compile:compile
    }
  ));
  app.use(express.static(config.rootPath +'/public'));

};