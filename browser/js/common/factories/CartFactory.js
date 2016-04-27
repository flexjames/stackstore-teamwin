app.factory('CartFactory', function($http, $q){

  function getCart(){
    return $q(function(resolve, reject){
      if (sessionStorage.cart){
        var cart = JSON.parse(sessionStorage.cart);
        return resolve(cart);
      }
      return $http.get('/api/orders').then(function(res){
        setCart(res.data);
        return resolve(res.data);
      });
    });
  }
  function setCart(cart){
    sessionStorage.cart = JSON.stringify(cart);
  }
  function checkLocal(){
    return !!sessionStorage.cart;
  }
  return {
    addToCart: function(product, quantity){
        return getCart().then(function(cart){
          //TO DO: check to see if product is not in cart
          var existingItem = cart.items.filter(function(it){
            return it.product._id === product._id;
          })[0];
          if (existingItem)
            existingItem.quantity+= quantity;
          else {
            cart.items.push({
              product: product,
              quantity: quantity,
              price: product.price
            });
          }
          setCart(cart);
          return $q.resolve(cart);
        });
    },
    getQuantity: function(){
      if (checkLocal()){
        var cart = JSON.parse(sessionStorage.cart);
        console.log('unique', cart.items.length);
        return cart.items.reduce(function(acc, it){
          return acc + it.quantity;
        }, 0);

      }
      return 0;
    }
  };
});
