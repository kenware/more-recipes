//
process.env.NODE_ENV = 'test';
//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
let should = chai.should();
import model from '../server/models';
const user = model.user;
const recipesDetail = model.recipesDetail;
const  recipeReview = model.recipeReview;
const  favorite = model.favorite;
chai.use(chaiHttp);
import FormData from 'form-data';

//existing user should not sign up
describe('/POST api/users/signup', () => {
       before((done) => {
        user.sync()
        .then(() => {
            done();
        });
      });
      before((done) => {
        recipesDetail.sync()
        .then(() => {
            done();
        });
      });

      before((done) => {
        recipeReview.sync()
        .then(() => {
            done();
        });
      });

      before((done) => {
        favorite.sync()
        .then(() => {
            done();
        });
      });

      before((done) => {
        user.destroy({
            where: {}
        })
        .then(() => {
            done();
        });
    });

      it('user should sign up', (done) => {
        chai.request(server)
            .post('/api/users/signup')
            .send({
                  username:'ken',
                  fullName:'ken',
                  email:'kelvin@gmail.kev',
                  password:'12345678'
                 })
            .end((err, res) => {
                //res.should.have.status(201);
                res.body.should.have.property('username').eql('ken');
                done();
            });
      });

      it('user with existing email should not sign up', (done) => {
        chai.request(server)
            .post('/api/users/signup')
            .send({
                  username:'ken',
                  fullName:'ken',
                  email:'kelvin@gmail.kev',
                  password:'12345678'
                 })
            .end((err, res) => {
                //res.should.have.status(401);
                res.body.should.be.eql("email already exist");
                done();
            });
      });

      it('user with existing username should not sign up', (done) => {
        chai.request(server)
            .post('/api/users/signup')
            .send({
                  username:'ken',
                  fullName:'ken',
                  email:'kelvin@gmail.kevu',
                  password:'12345678'
                 })
            .end((err, res) => {
                //res.should.have.status(401);
                res.body.should.be.eql("username already exist");
                done();
            });
      });
  });
//user should not sign in with wrong password or email
describe('/POST api/users/signin', () => {
      it('it should not sign in', (done) => {
        chai.request(server)
            .post('/api/users/signin')
            .send({email:'kelvin@gmail.kev',
                  password:'wrongpassword'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.eql("incorrect password or email");
                done();
            });
      });
  });

describe('/GET api/recipes', () => {
      it('it should GET all the recipe', (done) => {
        chai.request(server)
            .get('/api/recipes')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                //res.body['error'].should.be.eql(false);
                done();
            });
      });
  });


describe('recipes', () => {
let token = '';
let id = 0; 
 before((done) => {
        chai.request(server)
            .post('/api/users/signin')
            .send({email:'kelvin@gmail.kev',
                  password:'12345678'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('succesful');
                res.body.should.have.property('token');
                //res.body['error'].should.be.eql(false);
                token = res.body.token;
                //let result = JSON.parse(res.text);
                //token = result.token;
                done();
       });      
  });

 
  it('it should POST recipe', (done) => {
      const payload = new FormData();
      payload.append('content', "oil egg")
      //payload.append('file', [])
        chai.request(server)
            .post('/api/recipes')
            .set('authorization', token)
            .field('content', "oil egg")
            .send(payload)    
            .end((err, res) => {
                //res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                //res.body.should.have.property('token');
                //res.body.should.be.eql(false);
                done();
            });
  });
  it('it should POST recipe', (done) => {
      let payload={title:'rice n okpa moimoi',
      content:'oil egg',ingredients:'oil orobo'}
     /*let payload = new FormData();
     payload.append('title','rice n okpa moimoi')
     payload.append('content', 'oil egg')
     payload.append('ingredients','oil orobo')
     payload.append('upvote', 0)
     payload.append('downvote', 0)
     //payload.append('file', '')
     //payload.append('file', '')
    let file = [];
    for(let x=0;x<file.length;x++){
    payload.append('file',file[x]);}
    */
     chai.request(server)
            .post('/api/recipes')
            .set('authorization', token)
            
            .field('Content-Type', 'multipart/form-data')
            .field('title','rice n okpa moimoi')
            .field('content','oil egg')
            .field('ingredients','oil orobo')
          
            .attach('file', "test/a.jpg")
            .send(payload)    
            .end((err, res) => {
                //res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql("rice n okpa moimoi");
                res.body.should.have.property('content').eql("oil egg");
                res.body.should.have.property('ingredients').eql("oil orobo");
                //res.body.should.have.property('token');
                //res.body.should.be.eql(false);
                id = res.body.id;

                done();
            });
  });
  it('it should PUT recipe', (done) => {
        chai.request(server)
            .put('/api/recipes/' + id)
            .set('authorization', token)
            .field('Content-Type', 'multipart/form-data')
            .field('title','rice n okpa moimoi')
            .field('content','oil egg')
            .field('ingredients','oil orobo')
            .attach('file', "test/a.jpg")
            .send({
              title: "rice n okpa moimoi",
              content : "oil egg",
              ingredients: "oil orobo"
             })    
            .end((err, res) => {
                //res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql("rice n okpa moimoi");
                res.body.should.have.property('content').eql("oil egg");
                res.body.should.have.property('ingredients').eql("oil orobo");
                //res.body.should.have.property('token');
                //res.body.should.be.eql(false);
                done();
            });
    });
    it('Add favorite recipes', (done) => {
        chai.request(server)
            .post('/api/recipes/' + id + '/favorite')
            .set('authorization', token)    
            .end((err, res) => {
                //res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('recipeId').eql(id);
                
                //res.body.should.have.property('token');
                res.status.should.be.eql(201);
                done();
            });
    });
    it('upvote recipes', (done) => {
        chai.request(server)
            .put('/api/recipes/' + id + '/upvote')
            .set('authorization', token)    
            .end((err, res) => {
                //res.should.have.status(201);
                res.body.should.be.a('string');
                res.body.should.be.eql('You cant upvote recipe you added');
               
                //res.body.should.have.property('token');
                //res.body.should.be.eql(false);
                done();
            });
    });
    it('downvote recipes', (done) => {
        chai.request(server)
            .put('/api/recipes/' + id + '/downvote')
            .set('authorization', token)    
            .end((err, res) => {
                //res.should.have.status(201);
                res.body.should.be.a('string');
                res.body.should.be.eql('You cant downvote recipe you added');
               
                //res.body.should.have.property('token');
                //res.body.should.be.eql(false);
                done();
            });
    });


/*
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
*/
});