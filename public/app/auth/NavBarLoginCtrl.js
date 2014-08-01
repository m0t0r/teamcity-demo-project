"use strict";

angular.module('tcApp')
  .controller('NavBarLoginCtrl', function($scope, $state, Auth, Notifier, Identity){

    $scope.identity = Identity;

    $scope.signin = function(username, password) {
      Auth.authenticateUser(username, password).then(function(success) {
        if(success){
          Notifier.notify('You have been successfully signed in!');
          $state.go('chat');
        } else {
          $scope.username = "";
          $scope.password = "";
          Notifier.error('User/Password incorrect!');
        }
      });
    };

    $scope.signout = function(){
      Auth.logoutUser().then(function() {
        $scope.username = "";
        $scope.password = "";
        Notifier.notify('You have been successfully signed out!');
        $state.go('index');
      });
    };

    $scope.signup = function() {
      var userData = {
        username:$scope.email,
        password:$scope.password,
        firstName:$scope.firstName,
        lastName:$scope.lastName
      };
      Auth.createUser(userData).then(function() {
        Notifier.notify('Your account has been created!');
        $state.go('chat');
      }, function(reason) {
        Notifier.error(reason);
      });
    };


  });