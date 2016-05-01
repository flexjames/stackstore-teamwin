app.factory('UtilFactory', function(){
  return {
    subtotal : function(order){
      return order.items.reduce(function(acc, it){
        return acc + (it.price * it.quantity);
      },0);
    },
    numItems : function(order){
      return order.items.reduce(function(acc, it){
        return acc + it.quantity;
      }, 0);
    },
    getStars: function(product){
       var avg = product.reviews.reduce(function(acc,it){
        return  acc + it.stars;
      },0) / product.reviews.length;
      return avg ? Array(Math.ceil(avg)) : 0;
    }
  };
});
