"use strict";

angular.module('tcApp', ['ui.router', 'ngResource']);

angular.module('tcApp').config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('index', {
      url:'/',
      templateUrl:'/partials/main/main.html',
      controller:'MainCtrl'
    })
    .state('signup', {
      url:'/signup',
      templateUrl:'/partials/auth/signup.html',
      controller:'NavBarLoginCtrl'
    })
    .state('chat', {
      url:'/chat',
      templateUrl:'/partials/chat/chat-index.html',
      controller:'ChatCtrl'
    });

}]);
