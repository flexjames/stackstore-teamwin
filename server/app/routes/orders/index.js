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

router.post('/removeItem', function(req, res) {
  req.session.order.items = req.session.order.items.filter(function(item){
    return item.product != req.body._id;
  });
  res.send(req.session.order);
});

router.post('/commit', function(req, res, next) {
  req.session.order.status = 'pending';
  req.session.order.commit()
  .then(function(order){
  	res.send(order);
  })
  .then(null, next);
});