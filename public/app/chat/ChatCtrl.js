"use strict";

angular.module('tcApp').controller('ChatCtrl', function($scope, Chat, Identity, Notifier){

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
  ];

  $scope.sendMessage = function(author, message){
    var user = author.firstName + ' ' + author.lastName;
    var newMessage = {
      author: user,
      text:message,
      date: new Date()
    };

    Chat.sendMessage(newMessage).then(function(success){
      if(success){
        $scope.chat.messages.push = newMessage;
      } else {
        Notifier.error('Could not send your message!');
      }
    });
  };

});