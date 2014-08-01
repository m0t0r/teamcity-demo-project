var should = require('chai').should(),
    User = require('./../../../server/models/user').User;

describe('Models', function(){

  describe('User', function(){
    var user = {};

    before(function(){
      user = new User({
        firstName:'unit',
        lastName:'test',
        username:'unit@test.com',
        salt:'somesampolesalt',
        hashedPassword:'somesamplehashedpassowrd'
      })
    });

    it('has first name', function(){

      user.firstName.should.equal('unit');

    });

    it('has last name', function(){

      user.lastName.should.equal('test');

    });

    it('has username which should be an email', function(){

      user.username.should.equal('unit@test.com');

    });

    it('has salt', function(){

      user.salt.should.equal('somesampolesalt');

    });

    it('has hashed password', function(){

      user.hashedPassword.should.equal('somesamplehashedpassowrd');

    });

    it('has created date', function(){

      user.createdAt.should.be.defined;

    });

  });

});