'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var Product = mongoose.model('Product');

//gets all categories as JSON string
router.get('/api/categories', function(req, res) {
  Category.find().exec()
    .then(function(categories) {
      res.json(categories);
    })
    .then(null, next);
});

//gets all the products with given category
router.get('/api/categories/:id', function(req, res) {
  Product.find({ category: { $in: [req.params.id] } }).exec()
    .then(function(products) {
      res.json(products);
    })
    .then(null, next);
});


router.delete('/api/categories/:id', function(req, res) {
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
router.put('/api/categories/:name', function(req, res) {
  Category.create({ name: req.params.name })
    .then(null, next);
});