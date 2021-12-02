/**
 * Group 9 - Milestone 4
 * 1. Quoc Phong Ngo - Student ID: 301148406
 * 2. Feiliang Zhou  - Student ID: 301216989
 * Date created: December 2, 2021
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()

// database
var database_url = process.env.MONGODB_URI;
var database_url = process.env.MONGODB_URI;
mongoose.connect(database_url, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("!!!! Connected to db: " + database_url)
});

//config
app.use(express.static('coverage'));
var port = process.env.PORT || 8000;
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(
      function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
      }
);
//Routes
app.use(require('./routes/users'));  
app.use(require('./routes/tasks'));  
app.use(require('./routes/patients')); 
app.use(require('./routes/clinicalRecords'));   


var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server listening at http://%s:%s", host, port)

  // console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' POST:   /users/register')
  console.log(' POST:   /users/login')
  console.log(' GET:    /patients')
  console.log(' POST:   /patients')
  console.log(' GET:    /patients/:id')
  console.log(' GET:    /patients/:id/clinical-records')
  console.log(' POST:   /patients/:id/clinical-records')
  console.log(' GET:    /users/:userId/tasks')
  console.log(' GET;    /users/:userId/tasks/:id')
})


