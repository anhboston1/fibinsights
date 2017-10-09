/**
 "id": 6,
 "firstName": "Brad",
 "lastName": "Green",
 "gender": "male",
 "address": "9874 Center St.",
 "city": "Orlando ",
 "state": {
                "abbreviation": "FL",
                "name": "Florida"
            },
 "orders": [
 {"productName": "Baseball", "itemCost": 9.99},
 {"productName": "Bat", "itemCost": 19.99}
 ],
 "latitude": 28.384238,
 "longitude": -81.564103
 */
const mongoose = require('mongoose'),
Schema = mongoose.Schema,
State = require('./state');

//console.log(State);
const OrderSchema = new Schema({
  product  : { type : String, required: true, trim: true },
  price    : { type : Number },
  quantity : { type : Number }
});

const DealSchema = new Schema({
  propertyName   : { type : String, required: true, trim: true },
  address    : { type : String, required: true, trim: true },
  city        : { type : String, required: true, trim: true },
  stateId     : { type : Number, required: true },
  state       : State.schema ,
  zip         : { type : Number, required: true },
  fixandflip      : [ OrderSchema ],
  holdandrent      : [ OrderSchema ],
});

module.exports = mongoose.model('Deal', CustomerSchema, 'deals');