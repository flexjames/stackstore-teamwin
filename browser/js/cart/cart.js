app.config(function($stateProvider){
  $stateProvider.state('cart', {
      url: '/cart',
      templateUrl: '/js/cart/cart.html',
      controller: function(cart, $scope, CartFactory, $state){
        $scope.cart = cart;
        $scope.shipping = {};

        $scope.sendOrder = function(){
          return CartFactory.submitCart($scope.shipping).then(function(){
            CartFactory.removeCart();
            $state.go('home');
          });
        };

        $scope.remove = function(idx){
          CartFactory.removeFromCart(idx).then(function(cart){
            $scope.cart = cart;
          });
        };

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
