'use strict';
var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  author: {type:String, required:'{PATH} is required!'},
  text:{type:String, required:'{PATH} is required!'},
  date:{type:Date}
});


var Message = mongoose.model('Message', messageSchema);

exports.Message = Message;