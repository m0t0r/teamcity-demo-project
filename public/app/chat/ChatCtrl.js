"use strict";

angular.module('tcApp')
  .controller('ChatCtrl', ['$scope', 'Chat', 'Identity', 'Notifier', 'ChatResource', function($scope, Chat, Identity, Notifier, ChatResource){

    $scope.identity = Identity;
    $scope.chat = {};
    $scope.chat.messages = ChatResource.query();

    $scope.sendMessage = function(author, message){
      var user = author.firstName + ' ' + author.lastName;
      var newMessage = {
        author: user,
        text:message,
        date: new Date()
      };

      Chat.sendMessage(newMessage).then(function(success){
        if(success){
          $scope.chat.messages.push(newMessage);
          $scope.chat.message = '';
        } else {
          Notifier.error('Could not send your message!');
        }
      });
    };

  }]);