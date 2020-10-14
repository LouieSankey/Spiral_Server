const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const testTasks = require('./test-helpers').makeTasks()

describe('Tasks Endpoints', function() {
    let db
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
      })
      app.set('db', db)
    })
  
    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db.raw("TRUNCATE TABLE task RESTART IDENTITY CASCADE"))

    context('Given there are tasks in the database', () => {
        
             beforeEach('insert tasks', () => {
               return db
                 .into('task')
                 .insert(testTasks)
             })


             it('GET /tasks responds with 200 and all of the tasks', () => {
                return supertest(app)
                  .get('/task')
                  .expect(200, testTasks)
                  // TODO: add more assertions about the body
              })

           })
  
  })