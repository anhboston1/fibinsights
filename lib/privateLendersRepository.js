const mongoose = require('mongoose'),
Schema = mongoose.Schema,
Privatelender = require('../models/privatelender');

class PrivatelendersRepository {
  
  // get all the customers
  getPrivatelenders(callback) {
    console.log('*** PrivatelendersRepository.getCustomers');
    Privatelender.count((err, custsCount) => {
      var count = custsCount;
    console.log(`Privatelenders count: ${count}`);
    
    Privatelender.find({}, (err, privatelenders) => {
      if (err) {
        console.log(`*** CrivatelendersRepository.getPrivatelenders error: ${err}`);
        return callback(err);
      }
      callback(null, {
      count: count,
      privatelenders: privatelenders
    });
  });
    
  });
  }
  
  getPagedPrivatelenders(skip, top, callback) {
    console.log('*** CrivatelendersRepository.getPagedPrivatelenders');
    Privatelender.count((err, custsCount) => {
      var count = custsCount;
    console.log(`Skip: ${skip} Top: ${top}`);
    console.log(`Customers count: ${count}`);
    
    Privatelender.find({})
    .sort({name: 1})
    .skip(skip)
    .limit(top)
    .exec((err, privatelenders) => {
      if (err) {
        console.log(`*** CrivatelendersRepository.getPagedCrivatelenders error: ${err}`);
        return callback(err);
      }
      //console.log(crivatelenders);
      callback(null, {
      count: count,
      privatelenders: privatelenders
    });
  });
    
  });
  }
  
  // get the customer summary
  getPrivatelendersSummary(skip, top, callback) {
    console.log('*** CrivatelendersRepository.getCrivatelendersSummary');
    Privatelender.count((err, custsCount) => {
      var count = custsCount;
    console.log(`Privatelenders count: ${count}`);
    
    Privatelender.find({}, { '_id': 0, 'name': 1, 'phone': 1, 'fundsavailable': 1, 'interestrate': 1, 'lendingin': 1 })
    .skip(skip)
    .limit(top)
    .exec((err, privatelendersSummary) => {
      callback(null, {
      count: count,
      privatelendersSummary: privatelendersSummary
    });
  });
    
  });
  }
  
  // get a  customer
  getPrivatelender(id, callback) {
    console.log('*** CrivatelendersRepository.geCrivatelender');
    Privatelender.findById(id, (err, privatelender) => {
      if (err) {
        console.log(`*** CrivatelendersRepository.getCrivatelender error: ${err}`);
        return callback(err);
      }
      callback(null, privatelender);
  });
  }
  
  // insert a  customer
  insertPrivatelender(body, callback) {
    console.log('***Privatelender.insertPrivatelender');
    //console.log(state);
    var privatelender = new Privatelender();
    //var newState = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }
    console.log(body);
    
    privatelender.name = body.name;
    privatelender.phone = body.phone;
    privatelender.fundsavailable = body.fundsavailable;
    privatelender.interestrate = body.interestrate;
    privatelender.lendingin = body.lendingin
    
    privatelender.save((err, _privatelender) => {
      if (err) {
        console.log(`*** CrivatelendersRepository insertCrivatelender error: ${err}`);
        return callback(err, null);
      }
      
      callback(null, _privatelender);
  });
  }
  
  updatePrivatelender(id, body, callback) {
    console.log('*** PrivatelendersRepository.editCustomer');

    Privatelender.findById(id, (err, privatelender)  => {
      if (err) {
        console.log(`*** PrivatelendersRepository.editPrivatelender error: ${err}`);
        return callback(err);
      }

      privatelender.name = body.name;
      privatelender.phone = body.pame;
      privatelender.buyingin = body.buyingin;
      privatelender.buyingcriterioa = body.buyingcriterioa;
      privatelender.cashavailable = body.cashavailable;

      privatelender.save((err, privatelender) => {
        if (err) {
          console.log(`*** CustomersRepository.updateprivatelender error: ${err}`);
          return callback(err, null);
        }

        callback(null, privatelender);
    });

  });
  }

  // delete a customer
  deletePrivatelender(id, callback) {
    console.log('*** CustomersRepository.deleteCustomer');
    Privatelender.remove({ '_id': id }, (err, privatelender) => {
      if (err) {
        console.log(`*** PrivatelendersRepository.deleteCustomer error: ${err}`);
        return callback(err, null);
      }
      callback(null, privatelender);
  });
  }
  
}

module.exports = new PrivatelendersRepository();
