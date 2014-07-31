'use strict';
var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
  development:{
    rootPath:rootPath,
    api:'v1',
    db:'mongodb://teamcitydemo:teamcitydemo@ds053439.mongolab.com:53439/teamcity-project',
    port:process.env.PORT || 8080
  },
  test:{
    rootPath:rootPath,
    api:'v1',
    db:'mongodb://teamcitydemo:teamcitydemo@ds053439.mongolab.com:53439/teamcity-project',
    port:process.env.PORT || 8080
  },
  production: {
    rootPath:rootPath,
    api:'v1',
    db:'mongodb://teamcitydemo:teamcitydemo@ds053439.mongolab.com:53439/teamcity-project',
    port:process.env.PORT || 80
  }
};