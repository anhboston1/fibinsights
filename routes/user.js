var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const mongoose = require('mongoose'),
Schema = mongoose.Schema;
var User = require('../models/user');

router.post('/signup', function (req, res, next) {
    //res.json(true);
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }/*
        res.status(201).json({
            message: 'User created',
            obj: result
        });*/
        login(req, res, next);
    });

});


function login(req, res, next)
{
    User.findOne({email: req.body.email}, function(err, user) {
        //return  res.json(true);
        if (err) {
            //return res.json(true);
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            //return res.json(true);
            console.log("Login failed");
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            //return res.json(true);
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        //return res.json(true);
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
}
router.post('/login', function(req, res, next) {
    login(req, res, next);
/*
    User.findOne({email: req.body.email}, function(err, user) {
        //return  res.json(true);
        if (err) {
            //return res.json(true);
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            //return res.json(true);
            console.log("Login failed");
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            //return res.json(true);
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        //return res.json(true);
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });*/
});
router.post('/logout', function(req, res, next) {
    res.json(true);
});
module.exports = router;
