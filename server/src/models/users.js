var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
   username: String,
   password:String,
   firstname:String,
   lastname:String,
   email: String,
   mobile: String,
   gender: String,
   role: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);