//
process.env.NODE_ENV = 'test';


let rec = require('../dist/models/models');
let reviews = rec.reviews;
let recipes = rec.contents;
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('rec', () => {
    
describe('/GET api/recipes', () => {
      it('it should GET all the recipe', (done) => {
        chai.request(server)
            .get('/api/recipes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                //res.body['error'].should.be.eql(false);
                done();
            });
      });
  });


describe('/POST api/recipes', () => {
      it('it should POST recipe', (done) => {
        chai.request(server)
            .post('/api/recipes')
            .send({})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body['recipe'].should.be.eql({});
                res.body['error'].should.be.eql(false);
                done();
            });
      });
  });

describe('/PUT api/recipes', () => {
      it('it should UPDATE recipe/:recipesid', (done) => {
        chai.request(server)
            .put('/api/recipes/' + 1)
            .send({
                   name:'bugger',
                   description:'delicious',
                   upvote: 3,
                   downvote:2
                   })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('sucess');
                res.body['error'].should.be.eql(false);
                done();
            });
      });
  });

  describe('/DELETE api/recipes', () => {
      it('it should DELETE recipe/:recipesid', (done) => {
        chai.request(server)
            .delete('/api/recipes/' + 1)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('sucess');
                res.body['error'].should.be.eql(false);
                done();
            });
      });
  });
});