'use strict';

//this  will be the /api/products/ route
var router = require('express').Router();
var Products = require('mongoose').model('Product');

router.param('id', function(req,res,next, id){
	Products.findById(id).then(function(product){
		if (product)
			req.product = product;
		next();
	}, next);
});
//get all products
router.get('/', function(req, res, next){
	Products.find()
	.then(function(products){
		if (!req.query.available)
			res.json(products);
		else {
			res.json(products.filter(function(it){
				return it.available === Boolean(req.query.available);
			}));
		}
	}, next);
});

//get one product
router.get('/:id', function(req, res, next){
		res.json(req.product);
});

router.post('/:id/reviews', function(req,res,next){
	req.product.addReview(req.body).then(function(product){
		res.json(product);
	}, next);
});

//get by category
//OM: this route will never be hit, category filtering will occur on the client
// router.get('/:category', function(req, res, next){
// 	Products.getByCategory(req.params.category) //look up category by name
// 	.then(function(products){
// 		res.json(products);
// 	}, next);
// });

//add a new product
router.post('/', function(req, res, next){
	if (req.user.isAdmin){
		Products.create(req.body)
		.then(function(product){
			res.json(product);
		}, next);
	}
	else {
		res.sendStatus(401);
	}
});

//edit a product
router.put('/:id', function(req, res, next){
	if (req.user.isAdmin){
		Products.findById(req.params.id)
		.then(function(product){
			var fields = Object.keys(req.body);

			fields.forEach(function(field){
				product[field] = req.body[field];
			});

			product.save()
			.then(function(product){
				res.json(product);
			});
		}, next);
	}
	else{
		res.sendStatus(401);
	}
});

//delete a product
router.delete('/:id', function(req, res, next){
	if (req.user.isAdmin){
		Products.remove({_id: req.params.id})
		.then(function(){
			res.sendStatus('204');
		})
		.then(null, next);
	} else{
		res.sendStatus(401);
	}
});





module.exports = router;
