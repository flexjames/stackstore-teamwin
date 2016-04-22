var mongoose = require('mongoose'),
  Promise = require('bluebird');

var categorySchema = mongoose.Schema({
  name: {
    type:String,
    unique: true
  },
  description: String
});

// categorySchema.pre('remove', function(next){
//   var instance = this;
//   mongoose.model("Product").find({category: {$in: [ instance._id]}})
//   .then(function(products){
//     // Promise.map(products, function(product){
//     //   product.category.remove(instance._id);
//     //   return product.save();
//     // })
//     console.log(products);
//     if (!products.length)
//       return next();
//     products[0].category.remove(instance._id);
//     products[0].save()
//     .then(function(data){
//       next();
//     }, next);
//   });
// });


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
