'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

router.post('/addItem', function(req, res, next){
  if (! req.session.order){
    req.session.order = new Order();
  }
  req.session.order.addItem(req.body.data.product, req.body.data.orderDetails);
  next();
});