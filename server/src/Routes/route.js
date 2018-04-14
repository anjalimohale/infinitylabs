const express=require('express');
const jwt=require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var User = require('../models/users');
const bcrypt = require('bcrypt');
router.get('/:page/:size/:sort_field/:sort_dir', function(req, res, next) {
  // console.log(JSON.parse(req.params.sort));
  let sort_field=req.params.sort_field;
  let sort_dir=req.params.sort_dir;
  let test;
  if(sort_dir=="asc"){
    test=-1;
  }
  else{
    test=1;
  }
  let page=parseInt(req.params.page);
  let size=parseInt(req.params.size);
console.log(page,size,sort_field,sort_dir)
  var log={page:'',total:'',size1:'',data1:''};
  if(!sort_field==' '){
  User.paginate ( User.find().sort({ [sort_field]: sort_dir, test: test }),{ page: page+1, limit: size }, function (err, users) {
    if (err) return next(err);
    log.page=users.page;
    log.total=users.total;
    log.size1=users.docs.limit;
    log.data1=users.docs;
    // console.log(log);
    res.json(log);
  });
}
else{
  User.paginate ({},{ page: page+1, limit: size }, function (err, users) {
    if (err) return next(err);
    log.page=users.page;
    log.total=users.total;
    log.size1=users.docs.length;
    log.data1=users.docs;
    // log.total=users.docs.length;
    res.json(log);
  });
}
});

const serverJWT_Secret = 'secret';

router.post('/login', function(req, res, next) {
    console.log(req.body);
    if(req.body.username && req.body.password ){
    User.findOne({ username: req.body.username })
    .then(result => {
      if(result){
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
            errorMessage: 'Wrong Password'
          });
        }
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
      errorMessage: 'Username or Password missing'
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