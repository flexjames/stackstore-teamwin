var mongoose = require('mongoose');


var productSchema = mongoose.Schema({
   name: String,
   description: String,
   price: Number,
   qauntity: Number,
   imageUrl: String,
   category: {
       //movie names?
       type: String
   },
   reviews: [mongoose.model('Review').schema]
});

productSchema.methods.addReview = function(reviewData, userId){
    var review = this.model('Review')({
      author: userId,
      content: reviewData
    });
    this.reviews.push(review);
    return this.save();

};

productSchema.statics.findByCategory = function(category){
  return this.model('Product').find({category: category});
};
mongoose.model('Product', productSchema);
