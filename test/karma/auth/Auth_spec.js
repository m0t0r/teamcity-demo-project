describe('Services', function(){

  describe('Auth service', function(){

    var $httpBackend, auth, identity;

    beforeEach(module('tcApp'));

    beforeEach(inject(function($injector){
      $httpBackend = $injector.get('$httpBackend');
      auth = $injector.get('Auth');
      identity = $injector.get('Identity');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('sends POST request when user sign in', function(){
      $httpBackend.expectPOST('/login').respond(200,{success:true});
      auth.authenticateUser('test', 12345);
      $httpBackend.flush();
    });

    it('sends POST request when sign out', function() {
      $httpBackend.expectPOST('/logout').respond(200);
      auth.logoutUser();
      $httpBackend.flush();
    });

    it('sets current user to Identity service if auth was successful', function() {
      $httpBackend.expectPOST('/login').respond(200,{success:true, user:{firstName:'unit', lastName:'test'}});
      auth.authenticateUser('test', 12345);
      $httpBackend.flush();
      expect(identity.currentUser.firstName).toEqual('unit');
      expect(identity.currentUser.lastName).toEqual('test');
    });

    it('sets current user in Identity service to undefined when user is logout', function() {
      $httpBackend.expectPOST('/logout').respond(200);
      auth.logoutUser();
      $httpBackend.flush();
      expect(identity.currentUser).toEqual(undefined)
    });

    it('does not set current user to Identity service if auth failed', function() {
      $httpBackend.expectPOST('/login').respond(200,{success:false, user:{}});
      auth.authenticateUser('fail', 12345);
      $httpBackend.flush();
      expect(identity.currentUser).toBeUndefined();
    })

  });

});