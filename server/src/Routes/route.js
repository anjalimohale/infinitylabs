const express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users');[disabled] = "userForm.invalid"
var propertySchema = require('../models/property');
var fs = require("fs");
var app = express();
var fs = require("fs")
var multer = require('multer')
var upload = multer({ dest: '.uploads/' })
var path = require('path');
app.use(express.static(path.join(__dirname, 'upload')));
// console.log('path',path);
// var upload = __dirname + "/upload/";
// app.use('/', express.static(upload));
// console.log('proprt:',Property)
router.get('/', function (req, res, next) {
  User.find(function (err, Users) {
    if (err) return next(err);
    res.json(Users);
  });
});

const serverJWT_Secret = 'secret';

router.post('/login', function (req, res, next) {
  console.log(req.body);
  if (req.body.username && req.body.password) {
    User.findOne({ username: req.body.username, password: req.body.password }, function (err, result) {
      if (result) {
        let payLoad = {
          firstname: result.firstname, lastname: result.lastname,
          email: result.email, mobile: result.mobile,
          gender: result.gender, role: result.role
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
  }
  else {
    res.status(403).send({
      errorMessage: 'Please provide email and password'
    });
  }
});

router.post('/register', function (req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function (req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

var type = upload.single('avatar');
router.post("/property-add", type, function (req, res) {
  // console.log('server:',req.file.path)
  var property = new propertySchema({
    url: req.file.originalname,
    title: req.body.title,
    price: req.body.price,
    cityname: req.body.cityname,
    description: req.body.description,
    email: req.body.email,
    mobile: req.body.mobile
  });
  
  var tmp_path = req.file.path;
  // console.log('file path',req.file.path)
  property.save(req.file.originalname)
  var target_path = '/home/infinity/infinitylabs/server/src/upload/' + req.file.originalname;
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest, function (e, d) { console.log(e) });
  fs.unlink(tmp_path, function (e, d) { console.log(e) });
  // src.on('end', function () { res.send({ 'filename': req.file.originalname }) 
  property.save(function (err, saveDoc) {
    if (err) throw err;
    return res.send({"message": 'Event saved !'})
    console.log('Event saved !')
  // });

})
});
// router.get('/getlist', function (req, res ,next) {
//   // console.log("getlist ",req.body);
//   propertySchema.find({ })
//   .sort({ "price": 1 })
//   ,function(err, docs, next) {
//     if (err) return next(err);
//     res.json(docs);  
//   }
// })

router.get('/getlist', function (req, res) {
  propertySchema.find({}).sort({ "price": 1 }).exec(function (err, listings) {
      if (err) {
          console.log(err);
      } else {
          res.render('price', { listings: listings });
      }
  })
});

router.delete('/:id', function (req, res, next) {
  Property.findByIdAndRemove(req.params.id, req.body, function (err, post) {
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