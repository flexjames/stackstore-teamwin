app.directive('orderAcc', function(){
  return {
    templateUrl: 'js/common/directives/order-acc/order-acc.html',
    scope: {
      orders: '=',
      admin: '=',
      users: '='
    },
    controller: function($scope, UserFactory, CartFactory, UtilFactory, AdminFactory){
      $scope.data = {};
      $scope.removeOrder = function(orderId){
        return UserFactory.removeOrder(orderId)
        .then(function(){
          $scope.orders = $scope.orders.filter(function(it){
            return it._id !== orderId;
          });
        });
      };
      $scope.getUser = function(order){
          var user = $scope.users.filter(function(it){
            return it._id === order.user;
          })[0];
          order.useremail = user.email;
      };
      $scope.changeStatus = function(order){
        if (order.newStatus)
          return AdminFactory.editOrder(order._id, {status: order.newStatus})
          .then(function(){
            order.isUpdated = true;
          });
      };

      $scope.fetchCart = CartFactory.fetchCart;
      $scope.setCart = CartFactory.setCart;
      $scope.subtotal = UtilFactory.subtotal;
      $scope.numItems = UtilFactory.numItems;
    }
  };
});
