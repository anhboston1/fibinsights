const privatelendersRepo = require('../../../lib/privatelendersRepository'),
util = require('util');

class PrivatelendersController {
  
  constructor(router) {
    router.get('/', this.getPrivatelenders.bind(this));
    router.get('/page/:skip/:top', this.getPrivatelendersPage.bind(this));
    router.get('/:id', this.getPrivatelender.bind(this));
    router.post('/', this.insertPrivatelender.bind(this));
    router.put('/:id', this.updatePrivatelender.bind(this));
    router.delete('/:id', this.deletePrivatelender.bind(this));
  }
  
  getPrivatelenders(req, res) {
    console.log('*** getPrivatelenders');
    privatelendersRepo.getPrivatelenders((err, data) => {
      if (err) {
        console.log('*** getPrivatelenders error: ' + util.inspect(err));
        res.json(null);
      } else {
        console.log('*** getPrivatelenders ok');
    res.json(data.privatelenders);
  }
  });
  }
  
  getPrivatelendersPage(req, res) {
    console.log('*** getPrivatelendersPage');
    const topVal = req.params.top,
    skipVal = req.params.skip,
    top = (isNaN(topVal)) ? 10 : +topVal,
    skip = (isNaN(skipVal)) ? 0 : +skipVal;

    privatelendersRepo.getPagedPrivatelenders(skip, top, (err, data) => {
      res.setHeader('X-InlineCount', data.count);
    if (err) {
      console.log('*** getPrivatelendersPage error: ' + util.inspect(err));
      res.json(null);
    } else {
      console.log('*** getPrivatelendersPage ok');
      //alert(data.Privatelenders);
      res.json(data.privatelenders);
    }
  });
  }
  
  getPrivatelender(req, res) {
    console.log('*** getPrivatelender');
    const id = req.params.id;
    console.log(id);

    privatelendersRepo.getPrivatelender(id, (err, privatelender) => {
      if (err) {
        console.log('*** getPrivatelender error: ' + util.inspect(err));
        res.json(null);
      } else {
        console.log('*** getPrivatelender ok');
        //console.log(data.Privatelenders);
        res.json(privatelender);
    }
  });
  }

  insertPrivatelender(req, res) {
    console.log('*** insertPrivatelender');

    privatelendersRepo.insertPrivatelender(req.body,(err, privatelender) => {
      if (err) {
        console.log('*** cashbuyersRepo.insertPrivatelender error: ' + util.inspect(err));
        res.json({status: false, error: 'Insert failed', privatelender: null});
      } else {
        console.log('*** insertPrivatelender ok');
        res.json({ status: true, error: null, privatelender: privatelender });
      }
    });
  }
  updatePrivatelender(req, res) {
    console.log('*** updatePrivatelender');
    console.log('*** req.body');
    console.log(req.body);

    privatelendersRepo.updatePrivatelender(req.params.id, req.body, (err, privatelender) => {
      if (err) {
        console.log('*** updatePrivatelender error: ' + util.inspect(err));
        res.json({ status: false, error: 'Update failed', privatelender: null });
      } else {
        console.log('*** updatePrivatelender ok');
      res.json({ status: true, error: null, customer: privatelender });
    }
  });
  }

  deletePrivatelender(req, res) {
    console.log('*** deletePrivatelender');

    privatelendersRepo.deletePrivatelender(req.params.id, (err) => {
      if (err) {
        console.log('*** deletePrivatelender error: ' + util.inspect(err));
        res.json({ status: false });
      } else {
        console.log('*** deletePrivatelender ok');
      res.json({ status: true });
    }
  });
  }
  
}

module.exports = PrivatelendersController;
