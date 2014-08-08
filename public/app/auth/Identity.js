"use strict";

angular.module('tcApp').factory('Identity', ['$window', 'UserResource', function($window, UserResource) {
  var currentUser;
  if($window.currentUserObj){
    currentUser = new UserResource();
    angular.extend(currentUser, $window.currentUserObj);
  }
  return {
    currentUser:currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    }
  };
}]);