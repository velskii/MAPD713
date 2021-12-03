/**
 * Group 9 - Milestone 4
 * 1. Quoc Phong Ngo - Student ID: 301148406
 * 2. Feiliang Zhou  - Student ID: 301216989
 * Date created: December 2, 2021
 */

var express = require('express');
var cors = require('cors')
var mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()

// database
var database_url = process.env.MONGODB_URI;
mongoose.connect(database_url, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("!!!! Connected to db: " + database_url)
});

//config
var port = process.env.PORT || 5000;
var app = express();
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 


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


