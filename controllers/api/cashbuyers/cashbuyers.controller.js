const cashbuyersRepo = require('../../../lib/cashbuyersRepository'),
util = require('util');

class CashbuyersController {
  
  constructor(router) {
    router.get('/', this.getCashbuyers.bind(this));
    router.get('/page/:skip/:top', this.getCashbuyersPage.bind(this));
    router.get('/:id', this.getCashbuyer.bind(this));
    router.post('/', this.insertCashbuyer.bind(this));
    router.put('/:id', this.updateCashbuyer.bind(this));
    router.delete('/:id', this.deleteCashbuyer.bind(this));
  }
  
  getCashbuyers(req, res) {
    console.log('*** getCashbuyers');
    cashbuyersRepo.getCashbuyers((err, data) => {
      if (err) {
        console.log('*** getCashbuyers error: ' + util.inspect(err));
        res.json(null);
      } else {
        console.log('*** getCashbuyers ok');
    res.json(data.cashbuyers);
  }
  });
  }
  
  getCashbuyersPage(req, res) {
    console.log('*** getCashbuyersPage');
    const topVal = req.params.top,
    skipVal = req.params.skip,
    top = (isNaN(topVal)) ? 10 : +topVal,
    skip = (isNaN(skipVal)) ? 0 : +skipVal;
    
    cashbuyersRepo.getPagedCashbuyers(skip, top, (err, data) => {
      res.setHeader('X-InlineCount', data.count);
    if (err) {
      console.log('*** getCashbuyersPage error: ' + util.inspect(err));
      res.json(null);
    } else {
      console.log('*** getCashbuyersPage ok');
      //alert(data.cashbuyers);
      res.json(data.cashbuyers);
    }
  });
  }
  
  getCashbuyer(req, res) {
    console.log('*** getCashbuyer');
    const id = req.params.id;
    console.log(id);
    
    cashbuyersRepo.getCashbuyer(id, (err, cashbuyer) => {
      if (err) {
        console.log('*** getCashbuyer error: ' + util.inspect(err));
        res.json(null);
      } else {
        console.log('*** getCashbuyer ok');
        //console.log(data.cashbuyers);
        res.json(cashbuyer);
    }
  });
  }
  
  insertCashbuyer(req, res) {
    console.log('*** insertCashbuyer: ' + req.body);

    cashbuyersRepo.insertCashbuyer(req.body,(err, cashbuyer) => {
      if (err) {
        console.log('*** cashbuyersRepo.insertCashbuyer error: ' + util.inspect(err));
        res.json({status: false, error: 'Insert failed', cashbuyer: null});
      } else {
        console.log('*** insertCashbuyer ok');
        res.json({ status: true, error: null, cashbuyer: cashbuyer });
      }
    });
  }
  updateCashbuyer(req, res) {
      console.log('*** updateCashbuyer');
      console.log('*** req.body');
      console.log(req.body);

    cashbuyersRepo.updateCashBuyer(req.params.id, req.body, (err, cashbuyer) => {
      if (err) {
        console.log('*** updateCustomer error: ' + util.inspect(err));
        res.json({ status: false, error: 'Update failed', cashbuyer: null });
      } else {
        console.log('*** updateCustomer ok');
        res.json({ status: true, error: null, cashbuyer: cashbuyer });
      }
    });
  }
  deleteCashbuyer(req, res) {
    console.log('*** deleteCashbuyer');
    
    cashbuyersRepo.deleteCashbuyer(req.params.id, (err) => {
      if (err) {
        console.log('*** deleteCashbuyer error: ' + util.inspect(err));
        res.json({ status: false });
      } else {
        console.log('*** deleteCashbuyer ok');
    res.json({ status: true });
  }
  });
  }
  
}

module.exports = CashbuyersController;
