const mongoose = require('mongoose'),
Schema = mongoose.Schema,
Cashbuyer = require('../models/cashbuyer');

class CashbuyersRepository {

  // get all the customers
  getCashbuyers(callback) {
    console.log('*** CashbuyersRepository.getCustomers');
    Cashbuyer.count((err, custsCount) => {
      var count = custsCount;
    console.log(`Cashbuyers count: ${count}`);

    Cashbuyer.find({}, (err, cashbuyers) => {
      if (err) {
        console.log(`*** CashbuyersRepository.getCashbuyers error: ${err}`);
        return callback(err);
      }
      callback(null, {
      count: count,
      cashbuyers: cashbuyers
    });
  });

  });
  }

  getPagedCashbuyers(skip, top, callback) {
    console.log('*** CashbuyersRepository.getPagedCashbuyers');
    Cashbuyer.count((err, custsCount) => {
      var count = custsCount;
    console.log(`Skip: ${skip} Top: ${top}`);
    console.log(`Customers count: ${count}`);

    Cashbuyer.find({})
    .sort({name: 1})
    .skip(skip)
    .limit(top)
    .exec((err, cashbuyers) => {
      if (err) {
        console.log(`*** CashbuyersRepository.getPagedCashbuyers error: ${err}`);
        return callback(err);
      }
      //console.log(cashbuyers);
      callback(null, {
      count: count,
      cashbuyers: cashbuyers
    });
  });

  });
  }

  // get the customer summary
  getCashbuyersSummary(skip, top, callback) {
    console.log('*** CashbuyersRepository.getCashbuyersSummary');
    Cashbuyer.count((err, custsCount) => {
      var count = custsCount;
    console.log(`Cashbuyers count: ${count}`);

    Cashbuyer.find({}, { '_id': 0, 'name': 1, 'phone': 1, 'buyingin': 1, 'buyingcriteria': 1, 'cashavailable': 1 })
    .skip(skip)
    .limit(top)
    .exec((err, cashbuyersSummary) => {
      callback(null, {
      count: count,
      cashbuyersSummary: cashbuyersSummary
    });
  });

  });
  }

  // get a  customer
  getCashbuyer(id, callback) {
    console.log('*** CashbuyersRepository.geCashbuyer');
    Cashbuyer.findById(id, (err, cashbuyer) => {
      if (err) {
        console.log(`*** CashbuyersRepository.getCashbuyer error: ${err}`);
        return callback(err);
      }
      callback(null, cashbuyer);
  });
  }

  // insert a  customer
  insertCashbuyer(body, callback) {
    console.log('*** CustomersRepository.insertCustomer');
    //console.log(state);
    var cashbuyer = new Cashbuyer();
    //var newState = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }
    console.log(body);

    cashbuyer.name = body.name;
    cashbuyer.phone = body.phone;
    cashbuyer.buyingin = body.buyingin;
    cashbuyer.buyingcriteria = body.buyingcriteria;
    cashbuyer.cashavailable = body.cashavailable;
    //customer.gender = body.gender;

    cashbuyer.save((err, cashbuyer) => {
      if (err) {
        console.log(`*** CashbuyersRepository insertCashbuyer error: ${err}`);
        return callback(err, null);
      }

      callback(null, cashbuyer);
  });
  }

  updateCashbuyer(id, body, callback) {
    console.log('*** CustomersRepository.editCustomer');


    Cashbuyer.findById(id, (err, cashbuyer)  => {
      if (err) {
        console.log(`*** CustomersRepository.editCustomer error: ${err}`);
        return callback(err);
      }

      cashbuyer.name = body.name;
      cashbuyer.phone = body.pame;
      cashbuyer.buyingin = body.buyingin;
      cashbuyer.buyingcriterioa = body.buyingcriterioa;
      cashbuyer.cashavailable = body.cashavailable;

      cashbuyer.save((err, cashbuyer) => {
        if (err) {
          console.log(`*** CustomersRepository.updateCustomer error: ${err}`);
          return callback(err, null);
        }

        callback(null, cashbuyer);
    });

  });
  }

  // delete a customer
  deleteCashbuyer(id, callback) {
    console.log('*** CustomersRepository.deleteCustomer');
    Cashbuyer.remove({ '_id': id }, (err, cashbuyer) => {
      if (err) {
        console.log(`*** CustomersRepository.deleteCustomer error: ${err}`);
        return callback(err, null);
      }
      callback(null, cashbuyer);
  });
  }

}

module.exports = new CashbuyersRepository();
