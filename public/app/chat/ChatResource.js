'use strict';
angular.module('tcApp').factory('ChatResource', function($resource) {

  var chatResource = $resource('/api/v1/chat/:id',{_id:'@id'});

  return chatResource;
});
