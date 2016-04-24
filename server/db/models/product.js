var mongoose = require('mongoose'),
  Promise = require('bluebird');

var categorySchema = mongoose.Schema({
  name: {
    type:String,
    unique: true
  },
  description: String
});

//pre-remove hook to delete all references to the category being removed
categorySchema.pre('remove', function(next){
  var instance = this;
  mongoose.model("Product").findByCategory(instance)
  .then(function(products){
    if (!products.length)
      return next();
    Promise.map(products, function(product){
      product.category.remove(instance._id);
      return product.save();
    })
    .then(function(){
      next();
    });
  });
});


var productSchema = mongoose.Schema({
   name: String,
   description: String,
   price: Number,
   qauntity: Number,
   imageUrl: [String],
   category: [{
       //movie names?
       type: mongoose.Schema.Types.ObjectId
   }],
   reviews: [mongoose.model('Review').schema]
});

//filter products by Category
productSchema.statics.findByCategory = function(category){
  return this.find({category: {$in: [ category._id]}});
};

//assigns review to product
productSchema.methods.addReview = function(reviewData, userId){
    var review = this.model('Review')({
      author: userId,
      content: reviewData
    });
    this.reviews.push(review);
    return this.save();

};
//assigns category to product
productSchema.methods.applyCategory = function(category){
    this.category.push(category._id);
    return this.save();
};


mongoose.model('Category', categorySchema);
mongoose.model('Product', productSchema);
