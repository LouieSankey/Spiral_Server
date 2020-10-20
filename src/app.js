require('dotenv').config()
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')

//rename this file and variable to reflect your created table
const accountRouter = require('./account/account_router')
const projectRouter = require('./project/project_router')
const taskRouter = require('./task/task_router')
const prefsRouter = require('./user_prefs/prefs_router')
const authRouter = require('./auth/auth-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';


app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())


app.use('/account', accountRouter)
app.use('/project', projectRouter)
app.use('/task', taskRouter)
app.use('/pref', prefsRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
    res.send('Hello, world!')
 })

app.use(function errorHandler(error, req, res, next) {
    let response
   
        if (NODE_ENV === 'production') {
            response = { error: { message: error.message, error } }
        } else {
            console.error(error)
            response = { message: error.message, error }
        }
    res.status(500).json(response)
    })

module.exports = app