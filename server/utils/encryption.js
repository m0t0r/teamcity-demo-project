'use strict';

var crypto = require('crypto');

exports.createSalt = function(){
  return crypto.randomBytes(128).toString('base64');
};

exports.hashPassword = function(salt, password){
  if(typeof password === "string"){
    var hmac = crypto.createHmac('sha256', salt);
    return hmac.update(password).digest('hex');
  }
  return '';

};