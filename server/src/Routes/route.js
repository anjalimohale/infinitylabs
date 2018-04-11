const express=require('express');
const jwt=require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users');

router.get('/', function(req, res, next) {
  User.find(function (err, Users) {
    if (err) return next(err);
    res.json(Users);
  });
});

const serverJWT_Secret = 'secret';

router.post('/login', function(req, res, next) {
    console.log(req.body);
   if(req.body.username && req.body.password ){
    User.findOne({username:req.body.username, password:req.body.password}, function (err,result) {
       if(result){ 
      let payLoad = { firstname:result.firstname, lastname:result.lastname, 
                      email:result.email, mobile:result.mobile, 
                      gender:result.gender, role:result.role
                    }
    const token = jwt.sign(payLoad, serverJWT_Secret); // <==== The all-important "jwt.sign" function
    res.status(200).send({
        user: result.firstname,
        token: token
    });
  } 
    else {
    res.status(403).send({
        errorMessage: 'Permission denied!'
      });
     }
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

// router.put('/:id', function(req, res, next) {
//   User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;