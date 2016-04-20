var mongoose = require('mongoose');


var itemSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: Number,
    price: Number
})

var orderSchema = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        enum: ['created', 'placed', 'canceled', 'closed']
    },
    items: [itemSchema],
    address: String,
    name: String
    
});

orderSchema.addItem = function(product, quantity){
    var item = new mongoose.model('LineItem')({
        product: product._id,
        quantity: quantity,
        price: product.price
    });
    this.items.push(item);
    return this.save();
}

mongoose.model('LineItem', itemSchema);
mongoose.model('Order', orderSchema);

