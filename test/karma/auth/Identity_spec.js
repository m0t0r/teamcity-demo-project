describe('Services', function(){

  describe('Identity service', function(){

    var identity, window;

    beforeEach(module('tcApp'));

    beforeEach(inject(function($injector) {
      identity = $injector.get('Identity');
      window = $injector.get('$window');
    }));

    it('does not contain user object if user was not authenticated', function() {
      expect(identity.currentUser).toBeUndefined();
      expect(window.currentUserObj).toBeUndefined();
      expect(identity.isAuthenticated()).toEqual(false);
    })

  });

});