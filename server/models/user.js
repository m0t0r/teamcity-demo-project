'use strict';
var mongoose = require('mongoose'),
  encryption = require('../utils/encryption');

var userSchema = mongoose.Schema({
  firstName: {type:String, required:'{PATH} is required!'},
  lastName: {type:String, required:'{PATH} is required!'},
  username: {
    type:String,
    required:'{PATH} is required!',
    unique:true
  },
  salt:{type:String, required:'{PATH} is required!'},
  hashedPassword:{type:String, required:'{PATH} is required!'},
  createdAt:{type:Date, default:new Date()}
});

userSchema.methods = {
  authenticate:function(password) {
    return encryption.hashPassword(this.salt, password) === this.hashedPassword;
  }
}

var User = mongoose.model('User', userSchema);


function createDefaultUsers() {
  User.find({}).exec(function(err, collection) {
    if(collection.length === 0){
      var salt, pwd;
      salt = encryption.createSalt();
      pwd = encryption.hashPassword(salt, 'admin');
      User.create({firstName:'Admin', lastName:'Test', username:'admin', salt:salt, hashedPassword:pwd, role:'admin'});
      salt = encryption.createSalt();
      pwd = encryption.hashPassword(salt, 'user')
      User.create({firstName:'User', lastName:'Test', username:'user', salt:salt, hashedPassword:pwd, role:'user'});
    }
  });
}

exports.User = User;
exports.createDefaultUsers = createDefaultUsers;