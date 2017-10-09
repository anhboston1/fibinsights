/**
 * Created by phuongnguyen on 10/8/17.
 */
const mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const StateSchema = new Schema({
  id           : { type : Number, required: true },
  rehabcost : { type : String, required: true, trim: true },
  monthtocompletesale         : { type :  String, required: true, trim: true }
});

module.exports = mongoose.model('State', StateSchema);
