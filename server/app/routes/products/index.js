'use strict'

//this  will be the /api/products/ route
var router = require('express').Router();
var Products = require('mongoose').model('Product');

//get all products
router.get('/', function(req, res, next){
	Products.find({}).populate('reviews')
	.then(function(products){
		res.json(products);
	})
	.then(null, next);
});

//get one product
router.get('/:id', function(req, res, next){
	Products.findOne({_id: req.params.id}).populate('reviews')
	.then(function(product){
		res.json(product);
	})
	.then(null, next);
});

//get by category
router.get('/:category', function(req, res, next){
	Products.findOne({cateogry: req.params.category}).populate('reviews')
	.then(function(products){
		res.json(products);
	})
	.then(null, next);
});

//add a new product
router.post('/', function(req, res, next){
	Products.create(req.body)
	.then(function(product){
		res.json(product)
	})
	.then(null, next);
});

//edit a product
router.put('/:id', function(req, res, next){
	Products.findById(req.params.id)
	.then(function(product){
		var fields = Object.keys(req.body);

		fields.forEach(field){
			product[field] = req.body[field];
		};

		product.save()
		.then(function(product){
			res.json(product);
		})
	})
	.then(null, next);
})

//delete a product
router.delete('/:id', function(req, res, next){
	Products.remove({_id: req.params.id})
	.then(function(){
		res.sendStatus('204');
	})
	.then(null, next);
});





module.exports = router;