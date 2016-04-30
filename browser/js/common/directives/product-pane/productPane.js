app.directive('productPane', function(){
  return {
    scope:{
      product: '='
    },
    controller: function($scope, CartFactory){
      $scope.getStars = function(product){
          return new Array(product.stars);
      };
      $scope.addToCart = function(product){
        return CartFactory.addToCart(product, 1);
      };

      $scope.nInCart = function(product){
        if (CartFactory.isCart()){
          var match = CartFactory.fetchCart().items.filter(function(it){
            return it.product._id === product._id;
          })[0];
          return  match ? match.quantity : 0;
        }
        return;
      };
    },
    templateUrl: 'js/common/directives/product-pane/product-pane.html'
  };
});
