const express=require('express');
const jwt=require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  var log={page:'',total:'',size:4,data:''};
  User.find(function (err, users) {
    if (err) return next(err);
    log.data=users;
    log.total=users.length;
    res.json(log);
  });
});

const serverJWT_Secret = 'secret';

router.post('/login', function(req, res, next) {
    console.log(req.body);
    if(req.body.username && req.body.password ){
    User.findOne({ username: req.body.username })
    .then(result => {
      // then check to see if their password is the same as the hashed one
      result.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          let payLoad = { firstname:result.firstname, lastname:result.lastname, 
                          email:result.email, mobile:result.mobile, 
                          gender:result.gender, role:result.role
                        }
        const token = jwt.sign(payLoad, serverJWT_Secret); // <==== The all-important "jwt.sign" function
        res.status(200).send({
            user: payLoad,
            token: token
        });
      } 
        else {
        res.status(403).send({
            errorMessage: 'Permission denied!'
          });
        }
      });
    });
  }
      else {
      res.status(403).send({
      errorMessage: 'Please provide email and password'
    });
  }
});

router.post('/register', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
// router.get('/:email', function(req, res, next) {
//   User.findOne({email:req.params.email}, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

router.put('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;