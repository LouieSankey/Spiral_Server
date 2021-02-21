const express = require('express')
const xss = require('xss')
const path = require('path')
const jwt = require('jsonwebtoken');
const AccountService = require('./account_service')

const accountRouter = express.Router()
const jsonParser = express.json()

accountRouter
  .route('/')
  .get((req, res, next) => {
    AccountService.getAllAccounts(
      req.app.get('db')
    )
      .then(accounts => {
        res.json(accounts)
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { account_username, email, password } = req.body
    const newAccount = { account_username, email, password }

    for (const [key, value] of Object.entries(newAccount)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
      }
    }

    AccountService.insertAccount(
      req.app.get('db'),
      newAccount
    )
      .then(account => {

        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${account.id}`))
          .json(account)
      })
      .catch(next)
  })


accountRouter
  .route('/email/:email')
  .all((req, res, next) => {

    AccountService.getByEmail(
      req.app.get('db'),
      req.params.email
    )
      .then(account => {
        if (!account) {
          return res.status(404).json({
            error: { message: `account doesn't exist` }
          })
        }
        res.account = account 
        next() 
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {

    const { body } = req;
    const { email } = body;
    const { password } = body;

    if (email === res.account.email && password === res.account.password) {

      const user = res.account
      jwt.sign({ user }, 'privatekey', { expiresIn: '1h' }, (err, token) => {
        if (err) { console.log(err) }
        res.json({
          id: res.account.id,
          email: res.account.email,
          account_username: xss(res.account.account_username),
          date_published: res.account.date_published,
          token: token
        })

      });


    } else {
      return res.status(404).json({
        error: { message: `Incorrect Password` }
      })
    }


  })



accountRouter
  .route('/:account_id')
  .all((req, res, next) => {

    AccountService.getById(
      req.app.get('db'),
      req.params.account_id
    )
      .then(account => {
        if (!account) {
          return res.status(404).json({
            error: { message: `account doesn't exist` }
          })
        }
        res.account = account 
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json({
      id: res.account.id,
      account_username: xss(res.account.account_username), 
      date_published: res.account.date_published,
    })
  })

  .delete((req, res, next) => {
    AccountService.deleteAccount(
      req.app.get('db'),
      req.params.account_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

  .patch(jsonParser, (req, res, next) => {
    const { account_username } = req.body
    const accountToUpdate = { account_username, }

    const numberOfValues = Object.values(accountToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'account_username' or ''`
        }
      })
    }

    AccountService.updateAccount(
      req.app.get('db'),
      req.params.account_id,
      accountToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)

  })

module.exports = accountRouter