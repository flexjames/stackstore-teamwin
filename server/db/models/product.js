var mongoose = require('mongoose'),
  Promise = require('bluebird');

var categorySchema = mongoose.Schema({
  name: {
    type:String,
    unique: true
  },
  description: String,
  imageUrl: {
    type: String,
    default: '/images/categories/placeholder.jpg'
  }
});

//pre-remove hook to delete all references to the category being removed
categorySchema.pre('remove', function(next){
  var instance = this;
  mongoose.model("Product").findByCategory(instance.name)
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
   quantity: Number,
   imageUrl: {
     type: [String],
     default: ['http://placehold.it/350x350']
   },
   category: [{
       //movie names?
       type: mongoose.Schema.Types.ObjectId
   }],
   reviews: [mongoose.model('Review').schema],
   available: {
     type: Boolean,
     default: true
   }
});

//filter products by Category
productSchema.statics.findByCategory = function(name){
  var instance = this;
  return mongoose.model('Category').findOne({name: name})
  .then(function(category){
    if (!category)
      return Promise.resolve([]);
    return instance.find({category: {$in: [ category._id]}});
  });

};

//assigns review to product
productSchema.methods.addReview = function(reviewData){
    var review = this.model('Review')({
      author: reviewData.user,
      content: reviewData.content,
      title: reviewData.title,
      stars: reviewData.stars,
    });
    this.reviews.push(review);
    return this.save();

};
//assigns category to product
productSchema.methods.applyCategory = function(name){
  var instance = this;
  return mongoose.model('Category').findOne({name: name})
    .then(function(category){
      if (!category)
        return Promise.reject('No such category');
      instance.category.push(category._id);
      return instance.save();
    });

};


mongoose.model('Category', categorySchema);
mongoose.model('Product', productSchema);
