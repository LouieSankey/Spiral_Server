const authenticate = require('../jwtAuthenticate')

const express = require('express')
const xss = require('xss')
const path = require('path')
const AccountService = require('./account_service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const accountRouter = express.Router()
const jsonParser = express.json()



accountRouter
  .route('/')
  //I think this will get deleted
  // .get((req, res, next) => {
  //   AccountService.getAllAccounts(
  //     req.app.get('db')
  //   )
  //     .then(accounts => {
  //       res.json(accounts)
  //     })
  //     .catch(next)
  // })


  //this creates a new account
  .post(jsonParser, async (req, res, next) => {

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
 
    const { account_username, email } = req.body
    const newAccount = { account_username, email, password: hashedPassword }

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

        const user = account
        jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
          account.token = token
          res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${account.id}`))
          .json(account)
      })
        })
      
      .catch(next)
  })


//logs the user in (getAccountByEmail in client)
accountRouter
  .route('/email/:email')
  .all((req, res, next) => {

  //this checks to make sure the email exists in the db and happens before the post request
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

  .post(jsonParser, async (req, res, next) => {

    const { body } = req;
    const { email } = body;
    const { password } = body;

    //comparing the posted email and password to the response email and password
    if (await bcrypt.compare(password, res.account.password)) {

      const user = res.account
      jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
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
        error: { message: `Invalid Credentials` }
      })
    }

  })

accountRouter
  .route('/:account_id')
  .all( authenticate, (req, res, next) => {

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
    return res.json({
      id: res.account.id,
      account_username: xss(res.account.account_username), 
      date_published: res.account.date_published,
    })
  })

module.exports = accountRouter