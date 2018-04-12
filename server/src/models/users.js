var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
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
UserSchema.pre('save', function(next) {                                                                                                                                        
  if(this.password) {                                                                                                                                                        
      var salt = bcrypt.genSaltSync(10)                                                                                                                                     
      this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
  }                                                                                                                                                                          
  next()                                                                                                                                                                     
}) ;
module.exports = mongoose.model('User', UserSchema);