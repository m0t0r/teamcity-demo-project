'use strict';

exports.config = {

  specs:['test/e2e/**/*.js'],

  baseUrl: 'http://localhost:8080',

  framework: 'jasmine',

  capabilities: {
    'browserName': 'chrome'
  }

};
