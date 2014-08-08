'use strict';
angular.module('tcApp').factory('UserResource', ['$resource', function($resource) {

  var userResource = $resource('/api/v1/users/:id',{_id:'@id'}, {
    update:{url:'/api/v1/users/:id', method:'PUT', isArray:false}
  });

  return userResource;
}]);