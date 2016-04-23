// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Category = mongoose.model('Category');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Categories Route', function() {

  var categories = [
    { name: 'sabers', description: 'weapon' },
    { name: 'blasters', description: 'weapon' },
    { name: 'masks', descripton: 'disguise' }
  ];

  beforeEach('Establish DB connection', function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  beforeEach('Create the categories', function(done) {
    Category.create(categories, done);
  });

  afterEach('Clear test database', function(done) {
    clearDB(done);
  });

  describe('GET /api/categories', function() {

    var guestAgent;

    beforeEach('Create guest agent', function() {
      guestAgent = supertest.agent(app);
    });

    it('should get a 200 response with a three-item array as the body', function(done) {
      guestAgent.get('/api/categories')
        .expect(200)
        .end(function(err, response) {
          if (err) return done(err);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.equal(3);
          done();
        });
    });

  });

  // describe('Authenticated request', function () {

  // 	var loggedInAgent;

  // 	var userInfo = {
  // 		email: 'joe@gmail.com',
  // 		password: 'shoopdawoop'
  // 	};

  // 	beforeEach('Create a user', function (done) {
  // 		User.create(userInfo, done);
  // 	});

  // 	beforeEach('Create loggedIn user agent and authenticate', function (done) {
  // 		loggedInAgent = supertest.agent(app);
  // 		loggedInAgent.post('/login').send(userInfo).end(done);
  // 	});

  // 	it('should get with 200 response and with an array as the body', function (done) {
  // 		loggedInAgent.get('/api/members/secret-stash').expect(200).end(function (err, response) {
  // 			if (err) return done(err);
  // 			expect(response.body).to.be.an('array');
  // 			done();
  // 		});
  // 	});

  // });

});