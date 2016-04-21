var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({ //Reviews will be embedded into products, so no need for a product reference
   content: {
       type:String,
       required: true
   },
   created: {
       type: Date,
       default: Date.now
   },
   author: {
       type: mongoose.Schema.Types.ObjectId
   }
});

reviewSchema.methods.getAuthor = function(){
  return mongoose.model('User').findById(this.author);
};

mongoose.model('Review', reviewSchema);
