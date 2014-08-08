"use strict";

angular.module('tcApp').factory('Auth', ['$http', '$q','Identity', 'UserResource',function($http, $q, Identity, UserResource){

  return {

    authenticateUser: function(username, password) {
      var deferred = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(res) {
        if(res.data.success){
          var user = new UserResource();
          angular.extend(user, res.data.user);
          Identity.currentUser = user;
          deferred.resolve(true);
        } else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    },

    logoutUser: function(){
      var deferred = $q.defer();
      $http.post('/logout',{logout:true}).then(function() {
        Identity.currentUser = undefined;
        deferred.resolve(true);
      });
      return deferred.promise;
    },

    createUser: function(userData) {
      var newUser = new UserResource(userData);
      var deferred = $q.defer();
      newUser.$save().then(function() {
        Identity.currentUser = newUser;
        deferred.resolve(true);
      }, function(res) {
        deferred.reject(res.data);
      });
      return deferred.promise;
    }

  };

}]);