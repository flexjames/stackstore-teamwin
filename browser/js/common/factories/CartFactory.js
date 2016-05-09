//i like the idea of putting the CartFactory underneath cart.. easier to locate..
//same with other factories.
//alot going on here.. seems like you might want to have an Order Factory as well
app.factory('CartFactory', function($http, $q, Session){

  function getCart(){
    //interesting-- I didn't know $q supported this type of constructor
    return $q(function(resolve, reject){
      //instead of using sessionStorage directly-- inject the $window object-- and access it by using $window.sessionStorage-- this way you can write tests and you are not dependent on global window object
      if (sessionStorage.cart){
        var cart = JSON.parse(sessionStorage.cart);
        return resolve(cart);
      }
      return $http.get('/api/orders/new').then(function(res){
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

  //maybe addToCart and removeFromCart can be refactored?
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
          return $http.post('/api/orders', cart).then(function(res){
            return res.data;
          });
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
        delete sessionStorage['cart'];//i think this api has a removeItem method
    },
    setCart: function(cart){
      sessionStorage.cart = JSON.stringify(cart);
    },
    submitCart: function(shipping){
      return getCart().then(function(cart){
        cart.status = 'placed';
        cart.email = shipping.email;
        cart.address = shipping.address;
        if (Session.user)
          return $http.put('/api/orders/checkout/' + cart._id, cart);
        return $http.post('/api/orders', cart).then(function(){
          return $http.put('/api/orders/checkout/' + cart._id, cart);
        });
      });

    },

    isCart: function(){
      return checkLocal();
    },
    initCart: function(){
      var instance = this;
      return $q(function(resolve,reject){
        var user = Session.user;
        if (instance.isCart()) {//If anon user has begun filling cart
          return instance.sendCartToApi().then(function(cart){
            instance.setCart(cart);
            resolve();
          });
        }
        else if (!instance.isCart() && user) {
          return instance.fetchOrders(user._id).then(function(orders){
            if (orders.length){
              instance.setCart(orders[orders.length -1]);
              resolve();
            }
            else {
              return instance.sendCartToApi().then(function(cart){
                instance.setCart(cart);
                resolve();
              });
            }
          });
        }
      });

    }
  };
});
