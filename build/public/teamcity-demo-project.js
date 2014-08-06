/*
teamcity-demo-project 0.0.0
Simple JS full stack project to test TeamCity CI 
Built on 2014-08-06
*/
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
    .state('signup', {
      url:'/signup',
      templateUrl:'/partials/auth/partials/signup',
      controller:'NavBarLoginCtrl'
    })
    .state('chat', {
      url:'/chat',
      templateUrl:'/partials/chat/partials/chat-index',
      controller:'ChatCtrl'
    });

});
;
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

});;
"use strict";

angular.module('tcApp').factory('Identity', function($window, UserResource) {
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
});;
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


  });;
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
    }
  };

});;
"use strict";

angular.module('tcApp')
  .controller('ChatCtrl', function($scope, Chat, Identity, Notifier, ChatResource){

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

  });;
'use strict';
angular.module('tcApp').factory('ChatResource', function($resource) {

  var chatResource = $resource('/api/v1/chat/:id',{_id:'@id'});

  return chatResource;
});
;
'use strict';
angular.module('tcApp').value('Toastr', toastr);

angular.module('tcApp').factory('Notifier', function(Toastr) {
  return {
    notify: function(msg) {
      Toastr.success(msg);
    },
    error: function(msg) {
      Toastr.error(msg);
    }
  };
});;
"use strict";

angular.module('tcApp').controller('MainCtrl',function(){



});;
'use strict';
angular.module('tcApp').factory('UserResource', function($resource) {

  var userResource = $resource('/api/v1/users/:id',{_id:'@id'}, {
    update:{url:'/api/v1/users/:id', method:'PUT', isArray:false}
  });

  return userResource;
});