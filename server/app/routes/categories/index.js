'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Product = mongoose.model('Product');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

//gets all categories as JSON string
router.get('/', function(req, res, next) {
  Category.find().exec()
    .then(function(categories) {
      res.json(categories);
    })
    .then(null, next);
});

//gets all the products with given category
router.get('/:id', function(req, res, next) {
  Product.find({ category: { $in: [req.params.id] } }).exec()
    .then(function(products) {
      res.json(products);
    })
    .then(null, next);
});


router.delete('/:id', function(req, res, next) {
  //removes category from model
  Category.remove({ _id: req.params.id })
    .then(function() {
      //gets products with category
      return Product.find({ category: { $in: [req.params.id] } }).exec();
    })
    .then(function(products) {
      //converts matching products to an iterable promise
      return Promise.all(products);
    })
    .then(function(product){
    	//removes category from each product's array and saves 
    	_.pull(product.category, req.params.id);
    	product.save();
    })
    .then(null, next);
});

//adds new category to model
router.put('/:name', function(req, res, next) {
  Category.create({ name: req.params.name })
    .then(function(cat){
      res.json(cat);
    })
    .then(null, next);
});