const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const PrivateLenderSchema = new Schema({
  name    : { type : String, required: true, trim: true },
  phone     : { type : String, required: true, trim: true },
  fundsavailable        : { type : String, required: true, trim: true },
  interestrate         : { type : String },
  lendingin      : { type : String , required: true, trim: true}
});

module.exports = mongoose.model('Privatelender', PrivateLenderSchema, 'privatelenders');
