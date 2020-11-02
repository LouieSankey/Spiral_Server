

const express = require('express')
const xss = require('xss')
const path = require('path')

const UserPrefService = require('./prefs_service')

const prefRouter = express.Router()
const jsonParser = express.json()

prefRouter
  .route('/')
  .get((req, res, next) => {
    UserPrefService.getAllUserPrefs(
      req.app.get('db')
    )
      .then(pref => {
        res.json(pref)
      })
      .catch(next)
  })
  
  .post(jsonParser, (req, res, next) => {
    const { account, gong, _1, _2, _3, _5, _8, _13, _21, _34, _55, _89  } = req.body
    const newUserPref = { account, gong, _1, _2, _3, _5, _8, _13, _21, _34, _55, _89 }

    for (const [key, value] of Object.entries(newUserPref)) {
             if (value == null) {
               return res.status(400).json({
                 error: { message: `Missing '${key}' in request body` }
               })
             }
           }

    UserPrefService.insertUserPref(
      req.app.get('db'),
      newUserPref
    )
      .then(pref => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${pref.id}`))
          .json(pref)
      })
      .catch(next)
  })

prefRouter
  .route('/account/:account_id')
  .all((req, res, next) => {
         UserPrefService.getByAccountId(
           req.app.get('db'),
           req.params.account_id
         )
           .then(pref => {
             if (!pref) {
               return res.status(404).json({
                 error: { message: `pref doesn't exist` }
               })
             }
             res.pref = pref // save the pref for the next middleware
             next() // don't forget to call next so the next middleware happens!
           })
           .catch(next)
       })
  .get((req, res, next) => {
    res.json({
                   id: res.pref.id,
                   account: res.pref.account,
                   gong: res.pref.gong,
                   _1: res.pref._1,
                   _2: res.pref._2,
                   _3: res.pref._3, 
                   _5: res.pref._5, 
                   _8: res.pref._8, 
                   _13: res.pref._13, 
                   _21: res.pref._21, 
                   _34: res.pref._34,
                   _55: res.pref._55, 
                   _89 : res.pref._89
                 })
  })
  .delete((req, res, next) => {
    UserPrefService.deleteUserPref(
             req.app.get('db'),
             req.params.pref_id
           )
             .then(() => {
               res.status(204).end()
             })
             .catch(next)
       })


       .patch(jsonParser, (req, res, next) => {
           const {  gong, _1, _2, _3, _5, _8, _13, _21, _34, _55, _89 } = req.body
           const prefToUpdate = { gong, _1, _2, _3, _5, _8, _13, _21, _34, _55, _89  }

           const numberOfValues = Object.values(prefToUpdate).filter(Boolean).length
             if (numberOfValues === 0) {
               return res.status(400).json({
                 error: {
                   message: `Request body must contain a valide user preference value`
                 }
               })
             }
            
             
           UserPrefService.updateUserPref(
                 req.app.get('db'),
                 req.params.account_id,
                 prefToUpdate
               )
                 .then(numRowsAffected => {
                   res.json(numRowsAffected)
                 })
                 .catch(next)

         })

module.exports = prefRouter