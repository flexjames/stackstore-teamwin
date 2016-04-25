// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Category = mongoose.model('Category');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Orders Route', function() {

  var Obama = { email: 'obama@gmail.com', password: 'potus' };
  var Jonah = { email: 'jonah@gmail.com', password: 'wolf', isAdmin: true };
  var Oliver = { email: 'oliver@gmail.com', password: 'distres' };

  var users = [Obama, Oliver, Jonah];

  var foo = {
    name: 'foo',
    description: 'I am a foo',
    price: 1,
    quantity: 4,
  };
  var bar = {
    name: 'bar',
    description: 'I am a bar',
    price: 2.50,
    quantity: 2,
  };
  var bazz = {
    name: 'bazz',
    description: 'I am a bazz',
    price: 4.99,
    quantity: 7,
  };

  var products = [foo, bar, bazz];

  beforeEach('Establish DB connection', function(done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  beforeEach('Create the users', function(done) {
    User.create(users, done);
  });

  beforeEach('Create the products', function(done) {
    Product.create(products, done);
  });

  afterEach('Clear test database', function(done) {
    clearDB(done);
  });

  // Adding an item creates order in memory
  describe('POST /api/orders/addItem', function(){
    var guestAgent;

    beforeEach('Create guest agent', function() {
      guestAgent = supertest.agent(app);
    });


    it('should get a 200 response', function(done) {
      guestAgent.post('/api/orders/addItem', foo)
        .expect(200);
        done();
    });

  });

});