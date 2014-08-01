"use strict";

angular.module('tcApp', ['ui.router', 'ngResource']);

angular.module('tcApp').config(function($stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('index', {
      url:'/',
      templateUrl:'/partials/main/partials/main',
      controller:'MainCtrl'
    })
    .state('chat', {
      url:'/chat',
      templateUrl:'/partials/chat/partials/chat-index',
      controller:'ChatCtrl'
    });

});
