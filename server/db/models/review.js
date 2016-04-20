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
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   }
});

mongoose.model('Review', reviewSchema);