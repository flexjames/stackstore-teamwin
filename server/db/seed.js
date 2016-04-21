var mongoose = require('mongoose'),
  Promise = require('bluebird');
require('./models');

var Product = mongoose.model('Product'),
  User = mongoose.model('User');

  var products = [
    {
      name: 'foo',
      description: 'I am a foo',
      price: 2.99,
      quantity: 4,
      category: 'One'
    },
    {
      name: 'bar',
      description: 'I am a bar',
      price: 3.99,
      quantity: 2,
      category: 'One'
    },
    {
      name: 'bazz',
      description: 'I am a bazz',
      price: 4.99,
      quantity: 7,
      category : 'Two'
    }
  ];

  var users = [
    {email: 'larry@stooges.com', password: 'dumb'},
    {email: 'moe@stooges.com', password: 'dumber'},
    {email: 'curly@stooges.com', password: 'dumbest'}
  ];


  function seed(){
    return Promise.join(Product.insertMany(products), User.insertMany(users));
  }

  module.exports = seed;
