var should = require('chai').should(),
    encryption = require('./../../../server/utils/encryption.js');

describe('Utils', function(){

  describe('encryption', function(){

    it('create a unique salt', function(){

      var salt1 = encryption.createSalt();
      var salt2 = encryption.createSalt();
      var salt3 = encryption.createSalt();
      salt1.should.not.equals(salt2);
      salt1.should.not.equals(salt3);
      salt2.should.not.equals(salt3);

    });

    it('create a password using hashing with salt', function(){

      var salt = encryption.createSalt();
      var pwd = encryption.hashPassword(salt,'test');
      pwd.should.not.have.length(0);

    });

    it('reate password with hashing which could be checked on validity', function(){

      var salt1 = encryption.createSalt();
      var salt2 = encryption.createSalt();
      var pwd = encryption.hashPassword(salt1,'test');
      encryption.hashPassword(salt1,'test').should.equals(pwd);
      encryption.hashPassword(salt1,'unit').should.not.equals(pwd);
      encryption.hashPassword(salt2,'test').should.not.equals(pwd);

    });

  });

});