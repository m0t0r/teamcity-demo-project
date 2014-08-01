describe('Services', function(){

  describe('Chat service', function(){

    var $httpBackend, chat;

    beforeEach(module('tcApp'));

    beforeEach(inject(function($injector){
      $httpBackend = $injector.get('$httpBackend');
      chat = $injector.get('Chat');

    }));

    it('sends a POST request when user submit new message', function(){
      $httpBackend.expectPOST('/api/v1/chat').respond(200);
      var msgData = {
        author:'Unit Test',
        text:'unit test',
        date:new Date()
      };
      chat.sendMessage(msgData);
      $httpBackend.flush();
    });

  });

});