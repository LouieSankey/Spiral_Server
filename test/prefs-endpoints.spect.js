const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const testPref = require('./test-helpers').makePref()

describe('Prefs Endpoints', function() {
    let db
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
      })
      app.set('db', db)
    })
  
    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db.raw("TRUNCATE TABLE pref RESTART IDENTITY CASCADE"))

    context('Given there are prefs in the database', () => {
             beforeEach('insert pref', () => {
               return db
                 .into('pref')
                 .insert(testPref)
             })

             it('GET /pref responds with 200 and all of the prefs', () => {
                return supertest(app)
                  .get('/pref')
                  .expect(200, testPref)
              })

           })
  
  })