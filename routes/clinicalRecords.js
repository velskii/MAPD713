var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()

// database
var patientRecordsSchema = new mongoose.Schema({
    patientId: String,
    bloodPressure: String,
    respiratoryRate: String,
    bloodOxygenLevel: String,
    heartBeatRate: String
  });
var PatientRecords = mongoose.model('Patient-records', patientRecordsSchema);

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


// 6. Get records of one patient by his/her patient id
router.get('/patients/:id/clinical-records', function (req, res, next) {
  console.log('GET request: /patients/' + req.params.id + '/clinical-records');

  PatientRecords.find({ patientId: req.params.id }).exec(function (error, patientRecords) {
    if (patientRecords) {
      res.status(200).send(patientRecords)
    } else {
      res.status(404).send()
    }
  })
})

// 7. Create a new clinical records' patient
router.post('/patients/:id/clinical-records', function (req, res, next) {
    console.log('POST request: /patients/:id/clinical-records params=>' + JSON.stringify(req.params.id));
    console.log('POST request: /patients/:id/clinical-records body=>' + JSON.stringify(req.body));

    if (req.params.id === undefined) {
      throw new Error('id must be supplied')
    }
  
    var newPatientRecords = new PatientRecords({
      patientId: req.params.id,
      bloodPressure: req.body.bloodPressure,
      respiratoryRate: req.body.respiratoryRate,
      gender: req.body.gender,
      bloodOxygenLevel: req.body.bloodOxygenLevel,
      heartBeatRate: req.body.heartBeatRate
    });

    newPatientRecords.save(function (error, result) {
      if (error) return next(new Error(JSON.stringify(error.errors)))
      res.status(201).send( result )
    })
})


module.exports = router;