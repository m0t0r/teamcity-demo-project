describe('Controllers', function(){

  describe('NavBarLogin controller', function(){

    var deferred, scope, rootScope, Auth, notifier, controller, $httpBackend;

    beforeEach(module('tcApp'));

    beforeEach(inject(function(_$q_, _$rootScope_, _$controller_, _Auth_, _$httpBackend_, _Notifier_) {
      deferred = _$q_.defer();
      rootScope = _$rootScope_;
      scope = _$rootScope_.$new();
      Auth = _Auth_;
      notifier = _Notifier_;
      controller = _$controller_('NavBarLoginCtrl', {$scope:scope, Auth:Auth, notifier:notifier});
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('calls Auth service and resolves promise if sign in was successful', function(){
      $httpBackend.expectGET('/partials/chat/partials/chat-index').respond(200);
      $httpBackend.expectGET('/partials/main/partials/main').respond(200);
      spyOn(Auth, 'authenticateUser').andReturn(deferred.promise);
      spyOn(notifier, 'notify');
      scope.signin('unit', 'test');
      deferred.resolve(true);
      rootScope.$apply();
      $httpBackend.flush();

      expect(Auth.authenticateUser).toHaveBeenCalledWith('unit', 'test');
      expect(notifier.notify).toHaveBeenCalled();
    });

    it('calls Auth service and resolves promise if sign out was successful', function(){
      $httpBackend.expectGET('/partials/main/partials/main').respond(200);
      spyOn(Auth, 'logoutUser').andReturn(deferred.promise);
      spyOn(notifier, 'notify');
      scope.signout();
      deferred.resolve(true);
      rootScope.$apply();
      $httpBackend.flush();

      expect(scope.username).toBe('');
      expect(scope.password).toBe('');
      expect(Auth.logoutUser).toHaveBeenCalled();
      expect(notifier.notify).toHaveBeenCalled();
    });

    it('calls Auth service and resolve promise when user signs up', function() {
      $httpBackend.expectGET('/partials/chat/partials/chat-index').respond(200);
      $httpBackend.expectGET('/partials/main/partials/main').respond(200);
      spyOn(Auth, 'createUser').andReturn(deferred.promise);
      spyOn(notifier, 'notify');
      scope.signup();
      deferred.resolve(true);
      rootScope.$apply();
      $httpBackend.flush();

      expect(Auth.createUser).toHaveBeenCalled();
    })

  });

});