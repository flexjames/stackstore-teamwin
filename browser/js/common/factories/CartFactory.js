app.factory('CartFactory', function($http, $q, Session){

  function getCart(){
    return $q(function(resolve, reject){
      if (sessionStorage.cart){
        var cart = JSON.parse(sessionStorage.cart);
        return resolve(cart);
      }
      return $http.get('/api/orders').then(function(res){
        resolve(res.data);
      });
    });
  }
  function setCart(cart){
    //To DO: if user is logged in, send a request to the api
      return $q(function(resolve, reject){
        sessionStorage.cart = JSON.stringify(cart);
        if (Session.user){
          return $http.put('/api/orders/' + cart._id, cart ).then(function(res){
            resolve(res.data);
          });
        }
        resolve(cart);
      });




  }
  function checkLocal(){
    return !!sessionStorage.cart;
  }
  return {
    addToCart: function(product, quantity){
        return getCart().then(function(cart){
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
          return setCart(cart);

        });
    },

    removeFromCart : function(idx){
      return getCart().then(function(cart){
        cart.items.splice(idx,1);
        return setCart(cart).then(function(cart){
          return cart;
        });

      });
    },
    getQuantity: function(){
      if (checkLocal()){
        var cart = JSON.parse(sessionStorage.cart);
        return cart.items.reduce(function(acc, it){
          return acc + it.quantity;
        }, 0);

      }
      return 0;
    },
    setQuantity: function(idx, fn){
        return getCart().then(function(cart){
          cart.items[idx].quantity =  fn(cart.items[idx].quantity);
          return setCart(cart);
      });

    },
    fetchCart: function(){
      if (checkLocal())
        return JSON.parse(sessionStorage.cart);
    },
    sendCartToApi: function(){ //only used when a user has logged in
      return getCart().then(function(cart){
        cart.user = Session.user._id;
          return $http.post('/api/orders', cart);
        });

    },
    fetchOrders: function(userId){
      return $http.get('/api/orders/' + userId)
        .then(function(res){
          return res.data;
        });
    },
    removeCart: function(){
      if (checkLocal())
        delete sessionStorage['cart'];
    },
    setCart: function(cart){
      sessionStorage.cart = JSON.stringify(cart);
    },

    isCart: function(){
      return checkLocal();
    }
  };
});
