app.config(function($stateProvider){
  $stateProvider.state('order', {
      templateUrl: '/js/order/order.html',
      url:'/users/:userId',
      controller: function(orders, $scope){
        $scope.placed_orders = orders.filter(function(it){
          return it.status === 'placed';
        });
        $scope.created_orders = orders.filter(function(it){
          return it.status === 'created';
        });
      },
      resolve: {
        orders: function(UserFactory, $stateParams){
          return UserFactory.getUserOrders($stateParams.userId);
        }
      }
  });
});
