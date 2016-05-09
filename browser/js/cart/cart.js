app.config(function($stateProvider){
  $stateProvider.state('cart', {
      url: '/cart',
      templateUrl: '/js/cart/cart.html',
      controller: function(cart, $scope, CartFactory, $state){
        //think about putting this in it's own controller
        $scope.cart = cart;
        $scope.shipping = {};

        $scope.untouch = function(){
          $scope.ShippingForm.$setUntouched();
        };

        $scope.sendOrder = function(){
          return CartFactory.submitCart($scope.shipping)
            .then(function(){
              CartFactory.removeCart();//is this is promise
              //whenever you see nested then's think about flattening
              CartFactory.sendCartToApi()
                .then(function(cart){
                  CartFactory.setCart(cart);
                  $state.go('home');
              });
          });
        };

        $scope.remove = function(idx){
          CartFactory.removeFromCart(idx)
            .then(function(cart){
              $scope.cart = cart;
          });
        };

        //maybe increment and decrement can be refactored?
        $scope.increment = function(idx){
          return CartFactory.setQuantity(idx, function(n){
            return n+1;
          })
          .then(function(cart){
            $scope.cart.items[idx] = cart.items[idx];
          });
        };

        $scope.decrement = function(idx){
          return CartFactory.setQuantity(idx, function(n){
            return (n > 1 ? n-1 : n);
          })
          .then(function(cart){
            $scope.cart.items[idx] = cart.items[idx];
          });
        };

        $scope.subtotal = function(){
          //computations are business logic-- they are better off in services/factories.. easy to retest and reuse
          return $scope.cart.items.reduce(function(acc, it){
            return acc + (it.price * it.quantity);
          }, 0);
        };
      },
      resolve: {
        cart: function(CartFactory){
          return CartFactory.fetchCart();
        }
      }
    });
});
