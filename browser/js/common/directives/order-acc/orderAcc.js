app.directive('orderAcc', function(){
  return {
    templateUrl: 'js/common/directives/order-acc/order-acc.html',
    scope: {
      orders: '=',
      admin: '='
    },
    controller: function($scope, UserFactory, CartFactory, UtilFactory){
      $scope.removeOrder = function(orderId){
        return UserFactory.removeOrder(orderId)
        .then(function(){
          $scope.orders = $scope.orders.filter(function(it){
            return it._id !== orderId;
          });
        });
      };
      $scope.getUser = function(order){
        UserFactory.getOneUser(order.user).then(function(user){
          order.user = user.email;
        });
      };

      $scope.fetchCart = CartFactory.fetchCart;
      $scope.setCart = CartFactory.setCart;
      $scope.subtotal = UtilFactory.subtotal;
      $scope.numItems = UtilFactory.numItems;
    }
  };
});
