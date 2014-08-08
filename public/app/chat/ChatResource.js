'use strict';
angular.module('tcApp').factory('ChatResource', ['$resource', function($resource) {

  var chatResource = $resource('/api/v1/chat/:id',{_id:'@id'});

  return chatResource;
}]);
