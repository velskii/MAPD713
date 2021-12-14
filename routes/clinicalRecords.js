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


// 1. Get a single patient records by their patient id
router.get('/patients/:id/clinical-records', function (req, res, next) {
  console.log('GET request: /patients/' + req.params.id + '/clinical-records');

  // Find a single patient by their id
  PatientRecords.find({ patientId: req.params.id }).exec(function (error, patientRecords) {
    if (patientRecords[0]) {
      // Send the patient if no issues
      res.send(patientRecords)
    } else {
      // Send 404 header if the patient doesn't exist
      res.sendStatus(404)
    }
  })
})

// 2. Create a new clinical records' patient
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

 // 3. Delete a clinical record by clinical record Id
 router.delete('/patients/:patientId/clinical-records/:clinicalRecordsId', function (req, res, next) {
  console.log('DELETE request: /patients/' + req.params.patientId + '/clinical-records/' + req.params.clinicalRecordsId);
  if (!req.params.patientId && !req.params.clinicalRecordsId) {
    return next(new errors.BadRequestError('patientId and clinicalRecordsId must be supplied'))
  }

  PatientRecords.deleteOne({ _id: req.params.clinicalRecordsId }, function (err) {
    if (err) return next(new Error(JSON.stringify(err.errors)))
    res.send(200, {msg:'delete a clinical record by patientId successfully'})
  });
})

// 4. Update a clinical record by clinical record Id
 router.put('/patients/:patientId/clinical-records/:clinicalRecordsId', function (req, res, next) {
  console.log('PUT request: /patients/' + req.params.patientId + '/clinical-records/' + req.params.clinicalRecordsId);
  if (!req.params.patientId && !req.params.clinicalRecordsId) {
    return next(new errors.BadRequestError('patientId and clinicalRecordsId must be supplied'))
  }

  const filter = { _id: req.params.clinicalRecordsId };
  const update = {bloodPressure: req.body.bloodPressure, respiratoryRate: req.body.respiratoryRate, 
    bloodOxygenLevel: req.body.bloodOxygenLevel, heartBeatRate: req.body.heartBeatRate};
  
 
  PatientRecords.findOne(filter, function(err, clinicalRecords) {
    if(!err) {
        if(!clinicalRecords) {
            res.sendStatus(404)
        }
        clinicalRecords.bloodPressure = req.body.bloodPressure;
        clinicalRecords.respiratoryRate = req.body.respiratoryRate;
        clinicalRecords.bloodOxygenLevel = req.body.bloodOxygenLevel;
        clinicalRecords.heartBeatRate = req.body.heartBeatRate;

        clinicalRecords.save(function(err) {
            if(!err) {
                res.send(200, {msg:'update a clinical record by patientId successfully'})
            }
            else {
                return next(new Error(JSON.stringify(err.errors)))
            }
        });
      }
  });

})


module.exports = router;