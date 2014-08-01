var should = require('chai').should(),
    Message = require('./../../../server/models/message').Message;

describe('Models', function(){

  describe('Message', function(){
    var message = {};

    before(function(){
      message = new Message({
        author:'Unit Test',
        text:'unit test',
        date: new Date()
      })
    });

    it('has an author', function(){

      message.author.should.equal('Unit Test');

    });

    it('has some text', function(){

      message.text.should.equal('unit test');

    });

    it('has created date', function(){

      message.date.should.have.defined;

    });

  });

});
