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
var taskSchema = new mongoose.Schema({
    userId: String, 
    taskName: String, 
    time: Date,
    status:String,
  });
var Task = mongoose.model('Task', taskSchema);

    //Middle ware that is specific to this router
    router.use(function timeLog(req, res, next) {
        console.log('Time: ', Date.now());
        next();
    });


  // create new task data for a user
  router.post('/users/:userId/tasks', function (req, res, next) {
    console.log('POST request: /tasks/' + req.params.userId + '/tasks');
    if (req.params.userId === undefined) {
      throw new Error('useId must be supplied')
    }
    if (req.body.taskName === undefined) {
      throw new Error('taskName must be supplied')
    }
    if (req.body.time === undefined) {
      throw new Error('time must be supplied')
    }
    if (req.body.status === undefined) {
      throw new Error('status must be supplied')
    }
    
    var newTasks = new Task({
      userId: req.params.userId,
      taskName: req.body.taskName,
      time: req.body.time,
      status: req.body.status,
    });

    newTasks.save(function (error, result) {
      if (error) return next(new Error(JSON.stringify(error.errors)))
  
      res.status(201).send(result)
    })
  })

   // delete a task for a user
router.delete('/users/:userId/tasks/:taskId', function (req, res, next) {
    console.log('DELETE request: /tasks/' + req.params.userId + '/tasks/'+ req.params.taskId);
    
    if ((req.params.userId === undefined) || req.params.taskId === undefined) {
      throw new Error('useId and taskId must be supplied')
    }

    Task.deleteOne({ _id: req.params.taskId }, function (err) {
        if (err) {
          res.status(400).send( {msg:err} )
        } else {
          res.status(200).send( {msg:'delete successfully'} )
        }
    });
})


  // 8. Get all tasks of a user
  router.get('/users/:userId/tasks', function (req, res, next) {
    console.log('GET request: /users/'+req.params.userId+'/tasks/');
    // Find every entity within the given collection
    Task.find({userId: req.params.userId }).exec(function (error, result) {
      if (error) return next(new Error(JSON.stringify(error.errors)))
      res.send(result);
    })
  })

  // 9. Get one task of a user
  router.get('/users/:userId/tasks/:id', function (req, res, next) {
    console.log('GET request: /users/'+ req.params.userId +'/tasks/'+ req.params.id);
    Task.find({ _id: req.params.id }).exec(function (error, task) {
      if (task) {
        res.send(task)
      } else {
        res.status(404).send(error)
      }
    })
  })



module.exports = router;