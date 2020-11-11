const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { escapeAttrValue } = require('xss')
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

    before('insert tasks', () => {
      return db
        .into('task')
        .insert(testTasks)
    })

    context('Given there are tasks in the database', () => {
        
             it('GET /tasks responds with 200 and all of the tasks', () => {
                return supertest(app)
                  .get('/task')
                  .expect(200, testTasks)
              })

           })


  describe('GET /task/account/:account_id', () => {

    it('should return an array of tasks that match a given account id', () => {
 
          return supertest(app)
            .get(`/task/account/1`)
            .expect(200)
            .then(res => {

              expect(res.body).to.be.an('array');
              res.body.forEach = (task) => {
                expect(task).to.equal(doc.account);
              }

        });
    });

    it('should respond with a 404 when given an invalid id', () => {
      return supertest(app)
        .get('/tasks/account/55')
        .expect(404);
    });
    
  });


  describe('GET /task/:task_id', () => {

    it('should return the correct task when given an id', () => {
      let doc;
      return db('task')
        .first()
        .then(_doc => {
          doc = _doc
       
          return supertest(app)
            .get(`/task/${doc.id}`)
            .expect(200);
        })
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('id', 'task', 'project', 'account', 'cycle');
          expect(res.body.id).to.equal(doc.id);
          expect(res.body.task).to.equal(doc.task);
          expect(res.body.project).to.equal(doc.project);
          expect(res.body.account).to.equal(doc.account);
          expect(res.body.cycle).to.equal(doc.cycle);
        });
    });

    it('should respond with a 404 when given an invalid id', () => {
      return supertest(app)
        .get('/task/100')
        .expect(404);
    });
    
  });

})