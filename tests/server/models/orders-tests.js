var expect = require('chai').expect,
  mongoose = require('mongoose'),
  dbURI = process.env.DB_URI,
  clearDB = require('mocha-mongoose')(dbURI),
  seed = require('../../../server/db/seed'),
  Promise = require('bluebird'),
  db = require('../../../server/db/seed');

require('../../../server/db/models');

var Product = mongoose.model('Product'),
  User = mongoose.model('User'),
  Order = mongoose.model('Order');

describe('Order', function(){
  var order, user, products;
  before('Establish DB connection', function () {
      return db.connect();
    });

    beforeEach('seed db', function(){
      //console.log('seeding...');
      return db.seed();
    });

    beforeEach(function(){
      return Promise.join(User.findOne(), Product.find())
      .spread(function(_user, _products){
        user = _user;
        products = _products;
        order = new Order();
      });
    });

  afterEach('Clear test database', function () {
    //console.log('clearing');
      return db.drop();
  });

  describe('Order methods', function(){
    it('creates an order for a user', function(){
        user.addOrder(products[0]).then(function(order){
          expect(user.orders.length).to.equal(1);
          expect(order.status).to.equal('pending');
      });
    });
    it('adds an item to an order, update it and then remove it', function(){
      return order.addItem(products[0], {quantity: 2}).then(function(){
        expect(order.items.length).to.equal(1);
        order.updateQuantity(0, 3).then(function(order){
          expect(order.items[0].quantity).to.equal(3);
          order.removeItem(products[0]).then(function(order){
            expect(order.items.length).to.equal(0);
          });
        });

      });
    });
    it('Cannot commit an order that is not pending', function(){
      return order.commit().catch(function(err){
        expect(err).to.be.a('string');
      });
    });
    it('correctly calculates subtotal for order', function(){
      return Promise.join(order.addItem(products[0], {quantity: 2}), order.addItem(products[1]))
      .then(function(){
        expect(order.subtotal()).to.equal(4.5);
      });
    });
    it('retrieves the actual product from an order', function(){
      return order.addItem(products[0]).then(function(){
        order.getProductFromItem(0).then(function(product){
            expect(product.name).to.equal('foo');
        });
      });
    });
  });
});
