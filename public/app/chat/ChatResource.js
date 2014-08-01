'use strict';
angular.module('tcApp').factory('ChatResource', function($resource) {

  var chatResource = $resource('/api/v1/chat/:id',{_id:'@id'}, {
    update:{url:'/api/v1/chat/:id', method:'PUT', isArray:false}
  });

  return chatResource;
});
