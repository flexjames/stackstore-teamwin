var mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  User = mongoose.model('User'),
  Order = mongoose.model('Order'),
  Promise = require('bluebird');

function getRandom(coll){
    return coll[Math.round(Math.random() * (coll.length -1))];
}

function seed(){
  var orders;
  return Promise.join(Product.find(), User.find())
  .spread(function(products, users){
    var dates = [];
    for (var i = 1; i< 31; i++){
      dates.push(new Date('4/' + i + '/2016'));
    }
    var orders = dates.map(function(date){
      var user = getRandom(users);
      var rand = Math.round(Math.random() * 3 + 1);
      var items = [];
      while(rand-- >= 0){
        var product = getRandom(products),
        quantity = Math.round((Math.random() * 2 ) + 1);
        items.push({
            product: product,
            quantity: quantity,
            price: quantity * product.price
          });
      }
      return {
        user: user._id,
        created: date,
        status: 'placed',
        items: items,
        email: user.email
      };
    });
    console.log('seeding orders...');
    return Order.insertMany(orders);
  });
}

module.exports = seed;
