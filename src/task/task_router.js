const express = require('express')
const xss = require('xss')
const path = require('path')
const authenticate = require('../jwtAuthenticate')
const TaskService = require('./task_service')
const taskRouter = express.Router()
const jsonParser = express.json()

taskRouter
  .route('/')
  .post(jsonParser, authenticate, (req, res, next) => {
    const { account, project, task, cycle} = req.body
    const newTask = { account, project, task, cycle }

    for (const [key, value] of Object.entries(newTask)) {
             if (value == null) {
               return res.status(400).json({
                 error: { message: `Missing '${key}' in request body` }
               })
             }
           }

    TaskService.insertTask(
      req.app.get('db'),
      newTask
    )
      .then(task => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${task.id}`))
          .json(task)
      })
      .catch(next)
  })  
  
  taskRouter
  .route('/account/:account_id')
  .get(authenticate, (req, res, next) => {
    TaskService.getTasksForAccount(
      req.app.get('db'),
      req.params.account_id
    )
    .then(tasks => {
      res.json(tasks)
    })
    .catch(next)
})  
.post(jsonParser, (req, res, next) => {
    const {account, project, dateTo, dateFrom} = req.body
    const params = { account, project, dateTo, dateFrom }

    for (const [key, value] of Object.entries(params)) {
             if (value == null) {
               return res.status(400).json({
                 error: { message: `Missing '${key}' in request body` }
               })
             }
           }

    TaskService.getTasksForRange(
      req.app.get('db'),
      req.params.account_id,
      params
    )
      .then(tasks => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${tasks.id}`))
          .json([tasks])
      })
      .catch(next)
  })  

taskRouter
  .route('/:task_id/:account_id')
  .all(authenticate, (req, res, next) => {
         TaskService.getById(
           req.app.get('db'),
           req.params.task_id
         )
           .then(task => {
             if (!task) {
               return res.status(404).json({
                 error: { message: `task doesn't exist`}
               })
             }
             res.task = task 
             next() 
           })
           .catch(next)
       })
  .get((req, res, next) => {
    res.json({
                   id: res.task.id,
                   account: res.task.account,
                   project: res.task.project,
                   task: xss(res.task.task),
                   cycle: res.task.cycle,
                   date_published: res.task.date_published,
                 })
  })
  .delete((req, res, next) => {
    TaskService.deleteTask(
             req.app.get('db'),
             req.params.task_id
           )
             .then(() => {
               res.status(204).end()
             })
             .catch(next)
       })

       .patch(jsonParser, (req, res, next) => {
           const { account, project, task, cycle } = req.body
           const taskToUpdate = { account, project, task, cycle }

           const numberOfValues = Object.values(taskToUpdate).filter(Boolean).length
             if (numberOfValues === 0) {
               return res.status(400).json({
                 error: {
                   message: `Request body must contain either 'account' or 'task' etc`
                 }
               })
             }

           TaskService.updateTask(
                 req.app.get('db'),
                 req.params.task_id,
                 taskToUpdate
               )
                 .then(numRowsAffected => {
                   res.status(204).end()
                 })
                 .catch(next)

         })

module.exports = taskRouter