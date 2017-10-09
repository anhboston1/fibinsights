const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const CashBuyerSchema = new Schema({
  name    : { type : String, required: true, trim: true },
  phone     : { type : String, required: true, trim: true },
  buyingin        : { type : String, required: true, trim: true },
  buyingcriteria         : { type : String },
  cashavailable      : { type : String , required: true, trim: true}
});

module.exports = mongoose.model('Cashbuyer', CashBuyerSchema, 'cashbuyers');
