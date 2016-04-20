var mongoose = require('mongoose'),
    reviewSchema = require('review');


var productSchema = mongoose.Schema({
   name: String,
   description: String,
   price: Number,
   qauntity: Number,
   imageUrl: String,
   category: {
       //movie names?
   },
   reviews: [mongoose.model('Review').schema]
});

productSchema.methods.addReview = function(review){
    this.reviews.push(review);
    return this.save();
    
}
mongoose.model('Product', productSchema);

