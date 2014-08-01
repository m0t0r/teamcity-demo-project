describe('Controllers', function(){

  describe('Chat controller', function(){

    var deferred, scope, rootScope, Chat, Identity, controller, $httpBackend;

    beforeEach(module('tcApp'));

    beforeEach(inject(function(_$q_, _$rootScope_, _$controller_, _Chat_, _$httpBackend_, _Identity_) {
      deferred = _$q_.defer();
      rootScope = _$rootScope_;
      scope = _$rootScope_.$new();
      Chat = _Chat_;
      Identity = _Identity_;
      controller = _$controller_('ChatCtrl', {$scope:scope, Chat:Chat, Identity:Identity});
      $httpBackend = _$httpBackend_;
    }));

    it('calls Chat service and resolves promise when user submits a message', function(){
      spyOn(Chat, 'sendMessage').andReturn(deferred.promise);
      var mockUser = {firstName:'Unit', lastName:'Test'}
      var mockMsg = 'unit test';
      var msgData = {
        author:'Unit Test',
        text:'unit test',
        date:new Date()
      };
      scope.sendMessage(mockUser, mockMsg);
      deferred.resolve(true);
      rootScope.$apply();

      expect(Chat.sendMessage).toHaveBeenCalledWith(msgData);
    });

  });

});