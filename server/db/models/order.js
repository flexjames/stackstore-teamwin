var mongoose = require('mongoose');


var itemSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId},
    quantity: Number,
    price: Number
});

var orderSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    created: {
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        enum: ['created','pending', 'placed', 'canceled', 'closed'],
        default: 'created'
    },
    items: [itemSchema],
    address: String,
    name: String

});

orderSchema.methods.addItem = function(product){
    var item = this.model('LineItem')({
        product: product._id
    });
    this.items.push(item);
    return this.save();
};

orderSchema.methods.commit = function(){
  return new Promise(function(resolve,reject){
    if (this.status === 'pending'){ //status is 'pending' if order has been added to a user
      this.status = 'placed';
      this.save()
      .then(function(order){
        resolve(order);
      });
    }
    reject("Order has no associated user");
  });
};


mongoose.model('LineItem', itemSchema);
mongoose.model('Order', orderSchema);
