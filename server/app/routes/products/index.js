'use strict';

//this  will be the /api/products/ route
var path = require('path');
var router = require('express').Router();
var Products = require('mongoose').model('Product');
var fs = require('fs');
var multipart = require('multiparty');

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

//upload image
router.post('/image/:fileName', function(req, res){
  var size = '';
  var file_name = req.params.fileName;
  var destination_path = '';

  // Instantiation in order to use the API options multiparty.Form({options})
  var form = new multipart.Form();

  form.on('error', function (err) {
    console.log('Error parsing form: ' + err.stack);
  });

  form.on('file', function (name, file) {
    var temporal_path = file.path;
    var extension = file.path.substring(file.path.lastIndexOf('.'));
    destination_path = path.join(__dirname, '../../../../browser/images/products/', file_name + extension);
    var input_stream = fs.createReadStream(temporal_path);
    var output_stream = fs.createWriteStream(destination_path);
    input_stream.pipe(output_stream);

    input_stream.on('end',function() {
        fs.unlinkSync(temporal_path);
        console.log('Uploaded : ', file_name, size / 1024 | 0, 'kb', file.path, destination_path);
        });
  });

  form.on('close', function(){
    res.end('Uploaded!');
  });

  form.parse(req);

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
