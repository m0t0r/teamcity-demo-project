"use strict";

angular.module('tcApp').factory('Chat', function($http, $q, ChatResource){

  return {

    sendMessage:function(msgData){
      var newMsg = new ChatResource(msgData);
      var deferred = $q.defer();
      newMsg.$save().then(function() {
        deferred.resolve(true);
      }, function(res) {
        deferred.reject(res.data);
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

});