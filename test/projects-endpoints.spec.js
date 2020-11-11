const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const testProjects = require('./test-helpers').makeProjects()

describe('Projects Endpoints', function () {
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

  before('insert projects', () => {
    return db
      .into('project')
      .insert(testProjects)
  })

  

  describe('Given there are projects in the database', () => {

    it('GET /projects responds with 200 and all of the projects', () => {
      return supertest(app)
        .get('/project')
        .expect(200, testProjects)
    })

  })

  describe('GET /project/account/:account_id', () => {

    it('should return an array of projects that match a given account id', () => {

      return supertest(app)
        .get(`/project/account/1`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          res.body.forEach = (project) => {
            expect(project.id).to.equal(1);
          }

        });
    });

  });


  describe('GET /project/:project_id', () => {

    it('should return the correct project when given an id', () => {
      let doc;
      return db('project')
        .first()
        .then(_doc => {
          doc = _doc

          return supertest(app)
            .get(`/project/${doc.id}`)
            .expect(200);
        })
        .then(res => {
          console.log("my object", JSON.stringify(res.body))
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('account', 'date_published', 'id', 'project');
          expect(res.body.id).to.equal(doc.id);
          expect(res.body.project).to.equal(doc.project);
          expect(res.body.account).to.equal(doc.account);

        });
    });

    it('should respond with a 404 when given an invalid project_id', () => {
      return supertest(app)
        .get('/project/5')
        .expect(404);
    });

  });




})