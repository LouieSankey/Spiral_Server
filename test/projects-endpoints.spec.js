const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const testProjects = require('./test-helpers').makeProjects()

describe('Projects Endpoints', function() {
    let db
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
      })
      app.set('db', db)
    })
  
    after('disconnect from db', () => db.destroy())
    before('clean the table', () => db.raw("TRUNCATE TABLE project RESTART IDENTITY CASCADE"))

    context('Given there are projects in the database', () => {
        
             beforeEach('insert projects', () => {
               return db
                 .into('project')
                 .insert(testProjects)
             })


             it('GET /projects responds with 200 and all of the projects', () => {
                return supertest(app)
                  .get('/project')
                  .expect(200, testProjects)
                  // TODO: add more assertions about the body
              })

           })
  
  })