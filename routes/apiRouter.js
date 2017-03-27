let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Task = require('../db/schema.js').Task

  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

    // Routes for a Model(resource) should have this structure
    apiRouter

      .get('/task', function(request, response) {
        Task.find(request.query, function(error, records) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json(records)
        })
      })

      .post('/task', function(request, response) {
        var newTask = new Task(request.body)
          newTask.save(function(error, record) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json(record)
        })
      })

      .delete('/task/:taskId', function(request,response){
        Task.remove({_id: request.params.taskId}, function(error) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json({
            msg: `target with id ${request.params.taskId} has been eliminated.`,
            id: request.params.taskId
          })
        })
      })

      .put('/task/:taskId', function(request,response) {
        Task.findByIdAndUpdate(request.params.taskId,request.body,{new: true}, function(error,record) {
          if (error) {
            console.log(response)
            return response.status(400).json(error)
          }
          response.json(record)
        })
      })

module.exports = apiRouter