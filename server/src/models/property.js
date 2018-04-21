var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PropertySchema = new Schema({
  url: String,
   title:String,
   price:String,
   cityname:String,
   description:String,
   email: String,
   mobile: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('property', PropertySchema);