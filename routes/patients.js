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

// database
var patientSchema = new mongoose.Schema({
    firstName: String, 
    lastName: String, 
    age: Number,
    gender: String,
    healthInsuranceNo: String,
    phoneNo: String,
    email:String
});
var Patient = mongoose.model('Patient', patientSchema);

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// 1. Get all patients in the system
router.get('/patients', function (req, res, next) {
    console.log('GET request: patients');
    // Find every entity within the given collection
    Patient.find({}).exec(function (error, result) {
      if (error) throw new Error(JSON.stringify(error.errors))

      res.status(200).send(result);
    });
  })


  // 2. Get a single patient by their patient id
  router.get('/patients/:id', function (req, res, next) {
    console.log('GET request: patients/' + req.params.id);

    // Find a single patient by their id
    Patient.find({ _id: req.params.id }).exec(function (error, patient) {
      if (patient[0]) {
        // Send the patient if no issues
        res.status(200).send(patient)
      } else {
        // Send 404 header if the patient doesn't exist
        res.status(404).send()
      }
    })
  })


  // 3. Create a new patient
router.post('/patients', function (req, res, next) {
    console.log('POST request: patients params=>' + JSON.stringify(req.params));
    console.log('POST request: patients body=>' + JSON.stringify(req.body));

    if (req.body.firstName === undefined) {
        throw new Error('firstName must be supplied')
    }
    if (req.body.lastName === undefined) {
        throw new Error('lastName must be supplied')
    }
    if (req.body.healthInsuranceNo === undefined) {
      throw new Error('healthInsuranceNo must be supplied')
    }

    // Creating new patient.
    var newPatient = new Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        healthInsuranceNo: req.body.healthInsuranceNo,
        phoneNo: req.body.phoneNo,
        email: req.body.email
    });

    newPatient.save(function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))
        res.status(201).send( result )
    })
})

  // 4. Delete a patient
 router.delete('/patients/:patientId', function (req, res, next) {
  console.log('DELETE request: /patients/' + req.params.patientId);
  if (!req.params.patientId) {
    return next(new errors.BadRequestError('patientId must be supplied'))
  }

  Patient.deleteOne({ _id: req.params.patientId }, function (err) {
    if (err) return next(new Error(JSON.stringify(err.errors)))
    res.send(200, {msg:'delete patient successfully'})
  });
})


module.exports = router;