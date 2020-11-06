const express = require('express')
const xss = require('xss')
const path = require('path')

const ProjectService = require('./project_service')

const projectRouter = express.Router()
const jsonParser = express.json()

projectRouter
  .route('/')
  .get((req, res, next) => {
    ProjectService.getAllProjects(
      req.app.get('db')
    )
      .then(projects => {
        res.json(projects)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { account, project } = req.body
    const newProject = { account, project }

    for (const [key, value] of Object.entries(newProject)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    ProjectService.insertProject(
      req.app.get('db'),
      newProject
    )
      .then(project => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${project.id}`))
          .json(project)
      })
      .catch(next)
  })

projectRouter
  .route('/account/:account_id')
  .all((req, res, next) => {
    ProjectService.getProjectsForAccount(
      req.app.get('db'),
      req.params.account_id
    )
      .then(projects => {
        res.json(projects)
      })
      .catch(next)
  })

projectRouter
  .route('/:project_id')
  .all((req, res, next) => {
    ProjectService.getById(
      req.app.get('db'),
      req.params.project_id
    )
      .then(project => {
        if (!project) {
          return res.status(404).json({
            error: { message: `project doesn't exist` }
          })
        }
        res.project = project
        next() 
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json({
      id: res.project.id,
      project: xss(res.project.project),
      date_published: res.project.date_published,
    })
  })
  .delete((req, res, next) => {
    ProjectService.deleteProject(
      req.app.get('db'),
      req.params.project_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const { account, project } = req.body
    const projectToUpdate = { account, project }

    const numberOfValues = Object.values(projectToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'account' or 'project'`
        }
      })
    }

    ProjectService.updateProject(
      req.app.get('db'),
      req.params.project_id,
      projectToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)

  })

module.exports = projectRouter