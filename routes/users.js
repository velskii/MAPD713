/**
 * Group 9 - Milestone 4
 * 1. Quoc Phong Ngo - Student ID: 301148406
 * 2. Feiliang Zhou  - Student ID: 301216989
 * Date created: December 2, 2021
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()

const tools = require("../utils/tools");
// database
var userSchema = new mongoose.Schema({
    userId: String, 
    userName: String, 
    password:String,
    position: String,
    created_time: Date,
    login_token: String,
  });
var User = mongoose.model('User', userSchema);

//Middle ware that is specific to this router
router.use(function timeLog(error, req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// register
router.post('/users/register', function (req, res, next) {
    console.log('POST request: /users/register');
    console.log(req.body)
    if (req.body.userName === undefined) {
      return next('userName must be supplied')
    }
    if (req.body.password === undefined) {
      return next('password must be supplied')
    }
    if (req.body.position === undefined) {
      return next('position must be supplied')
    }
  
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
  
    var newUser = new User({
      userId: Math.floor(Math.random() * 1000 + 1), 
      userName: req.body.userName, 
      password: req.body.password,
      position: req.body.position,
      created_time: year + "-" + month + "-" + date,
      login_token: tools.generateToken(10),
    });
  
    newUser.save(function (error, result) {
      if (error) return next(new Error(JSON.stringify(error.errors)))
      res.status(201).send(result)
    })
  })

  // 2. login the system
  router.post('/users/login', function (req, res, next) {
    console.log('POST request: /users/login');
    if (req.body.userName === undefined) {
      return next('userName must be supplied')
    }
    if (req.body.password === undefined) {
      return next('password must be supplied')
    }
    User.find({userName:req.body.userName,password:req.body.password}).exec(function (error, result) {
      if (error) res.status(401).send('username or password not right')
      res.status(200).send(result);
    });
  })
  
  //get users
  router.get('/users', function (req, res, next) {
    console.log('GET request: users');
    // Find every entity within the given collection
    User.find({}).exec(function (error, result) {
      if (error) return next(new Error(JSON.stringify(error.errors)))
      res.status(200).send(result);
    });
  })


module.exports = router;