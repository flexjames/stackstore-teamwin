'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

router.get('/new', function(req, res, next) {
  //returns a new order
  var order = new Order();
  res.json(order);
});
//Admin route
router.get('/', function(req,res,next){
  if (req.user.isAdmin){
    Order.find().sort('-created').then(function(orders){
      res.json(orders);
    });
  } else{
    res.sendStatus(401);
  }
});

router.get('/:userId', function(req, res, next) {
  Order.find({ user: req.params.userId, status: 'created' })
    .then(function(orders) {
      res.json(orders);
    }, next);
});

router.put('/:orderId', function(req, res, next) {
  Order.findById(req.params.orderId).then(function(order) {
    if (order) {
      if (req.body.items)
        order.items = req.body.items;
      if (req.body.status && req.user.isAdmin)
        order.status = req.body.status;
      order.save().then(function() {
        res.json(order);
      }, next);
    } else {
      res.json(order);
    }
  });
});

router.post('/', function(req, res, next) {
  //Creates a new order from the recieved data
  Order.create(req.body).then(function(order) {
    res.json(order);
  }, next);
});

router.put('/checkout/:orderId', function(req, res, next) {
    Order.findById(req.params.orderId).then(function(order) {
    order.status = req.body.status;
    order.email = req.body.email;
    order.address = req.body.address;
    order.save()
    .then(function(order) {
      return order.confirm();
    })
    .then(function() {
      res.sendStatus(200);
    });
  });
});

router.delete('/:orderId', function(req, res, next) {
  Order.remove({ _id: req.params.orderId })
    .then(function() {
      res.sendStatus(203);
    }, next);
});

router.post('/commit', function(req, res, next) {
  Order.findById(req.session.order)
    .then(function(order) {
      return order.commit();
    })
    .then(function(order) {
      res.send(order);
    }, next);
});
