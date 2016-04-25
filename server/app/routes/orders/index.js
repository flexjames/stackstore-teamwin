'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

router.post('/addItem', function(req, res, next) {
  if (!req.session.order) {
    req.session.order = new Order();
  }
  req.session.order.addItem(req.body)
  .then(function(){
  	res.send(req.session.order);
  })
  .then(null, next);
});

// router.post('/removeItem', function(req, res, next) {
//   req.session.order.removeItem(req.body)
//   .then(function(){
//   	res.send(req.session.order);
//   })
//   .then(null, next);
// });

// router.post('/commit', function(req, res, next) {
//   req.session.order.status = 'pending';
//   req.session.order.commit()
//   .then(function(){
//   	res.send(req.session.order);
//   })
//   .then(null, next);
// });