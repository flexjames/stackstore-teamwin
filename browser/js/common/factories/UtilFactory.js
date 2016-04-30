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
    }
  };
});
