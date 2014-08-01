"use strict";

angular.module('tcApp').controller('ChatCtrl', function($scope, Identity){

  $scope.identity = Identity;
  $scope.chat = {};

  $scope.chat.messages = [
    {
      author:'Vitaly',
      text:'Hey there!',
      date:new Date()
    },
    {
      author:'Vitaly',
      text:'Anyone here?',
      date:new Date()
    },
    {
      author:'Vitaly',
      text:'Yup!',
      date:new Date()
    }
  ]

  $scope.sendMessage = function(){
    var user = Identity.currentUser.firstName + ' ' + Identity.currentUser.lastName;
    var text = $scope.chat.message;
    var newMessage = {
      user: user,
      text:text,
      date: new Date()
    }

    console.log(newMessage);
  }

});