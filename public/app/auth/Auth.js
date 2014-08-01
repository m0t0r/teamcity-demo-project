"use strict";

angular.module('tcApp').factory('Auth', function($http, $q, Identity, UserResource){

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
    }

  };

});