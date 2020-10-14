const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const testAccounts = require('./test-helpers').makeAccounts()

describe('Accounts Endpoints', function() {
    let db
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
      })
      app.set('db', db)
    })
  
    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db.raw("TRUNCATE TABLE account RESTART IDENTITY CASCADE"))

    context('Given there are accounts in the database', () => {
             
        
             beforeEach('insert accounts', () => {
               return db
                 .into('account')
                 .insert(testAccounts)
             })


             it('GET /accounts responds with 200 and all of the accounts', () => {
                return supertest(app)
                  .get('/account')
                  .expect(200, testAccounts)
                  // TODO: add more assertions about the body
              })

           })

  
  })