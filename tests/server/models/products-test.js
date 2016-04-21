var expect = require('chai').expect,
  mongoose = require('mongoose'),
  dbURI = process.env.DB_URI,
  clearDB = require('mocha-mongoose')(dbURI),
  seed = require('../../../server/db/seed'),
  Promise = require('bluebird');

require('../../../server/db/models');

var Product = mongoose.model('Product'),
  User = mongoose.model('User'),
  Order = mongoose.model('Order');

describe('Business model tests', function(){
  before('Establish DB connection', function (done) {
      if (mongoose.connection.db) done();
      mongoose.connect(dbURI, done);
    });

    beforeEach('seed db', function(done){
      //console.log('seeding...');
      seed().then(function(){
        done();
      });
    });

  afterEach('Clear test database', function (done) {
    //console.log('clearing');
      clearDB(done);
  });

  describe('Products', function(){
    describe('the basics', function(){
      it('should exist', function () {
          expect(Product).to.be.a('function');
      });
      it('there should be 3 products', function(){
        return Product.find().then(function(products){
          expect(products.length).to.equal(3);
        });
      });
    });
    describe('Product methods', function(){
      it('should add a review and get the user', function(){
        return Promise.join(User.findOne(), Product.findOne())
        .spread(function(user, product){
          return product.addReview('this is a review', user._id);
        })
        .then(function(product){
          expect(product.reviews.length).to.equal(1);
          return product.reviews[0].getAuthor();
        })
        .then(function(author){
          expect(author.email).to.equal('larry@stooges.com');
        });
      });
      it('should get by category', function(){
        return Product.findByCategory('One').then(function(products){
          expect(products.length).to.equal(2);
        });
      });
    });
  });
  describe('Orders', function(){
    var order, user, product;

    beforeEach(function(){
      return Promise.join(User.findOne(), Product.findOne())
      .spread(function(_user, _product){
        user = _user;
        product = _product;
        order = new Order();
      });
    });
    it('creates an order for a user', function(){
        user.addOrder(product).then(function(order){
          expect(user.orders.length).to.equal(1);
          expect(order.status).to.equal('pending');
      });
    });
    it('adds an item to an order', function(){
      return order.addItem(product).then(function(){
        expect(order.items.length).to.equal(1);
      });
    });
    it('Cannot commit an order that is not pending', function(){
      return order.commit().catch(function(err){
        expect(err).to.be.a('string');
      });
    });
  });

});
