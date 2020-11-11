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

    before('insert accounts', () => {
      return db
        .into('account')
        .insert(testAccounts)
    })

    describe('Given there are accounts in the database', () => {
             
             it('GET /accounts responds with 200 and all of the accounts', () => {
                return supertest(app)
                  .get('/account')
                  .expect(200, testAccounts)
              })

           })

  describe('Given there are accounts in the database', () => {

    it('GET /account responds with 200 and all of the accounts', () => {
      return supertest(app)
        .get('/account')
        .expect(200, testAccounts)
    })

  })

  describe('POST /account/email/:email', () => {

    it('should return the account that matches a specific email', () => {

      let testAccount = {
        email: 'test@email.com',
        password: 'password',
      }

      return supertest(app)
        .post(`/account/email/test@email.com`)
        .send(testAccount)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.equal(testAccount.email)

        });
    });

  });


  describe('GET /account/:account_id', () => {
    it('should return the correct account when given an id', () => {
      
      let doc;
      return db('account')
        .first()
        .then(_doc => {
          doc = _doc

          return supertest(app)
          .get(`/account/${doc.id}`)
          .expect(200)
        })
        .then(res => {
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.keys('id', 'account_username', 'date_published');
            expect(res.body.id).to.equal(doc.id);
            expect(res.body.account_username).to.equal(doc.account_username);

        });
    });

    it('should respond with a 404 when given an invalid account_id', () => {
      return supertest(app)
        .get('/account/5')
        .expect(404);
    });

  });


  
  })