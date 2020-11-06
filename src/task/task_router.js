const express = require('express')
const xss = require('xss')
const path = require('path')

const TaskService = require('./task_service')

const taskRouter = express.Router()
const jsonParser = express.json()

taskRouter
  .route('/')
  .get((req, res, next) => {
    TaskService.getAllTasks(
      req.app.get('db')
    )
      .then(tasks => {
        res.json(tasks)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
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
  .all((req, res, next) => {
    TaskService.getTasksForAccount(
      req.app.get('db'),
      req.params.account_id
    )
    .then(tasks => {
      res.json(tasks)
    })
    .catch(next)
})  

taskRouter
  .route('/:task_id')
  .all((req, res, next) => {
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