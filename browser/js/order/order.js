app.config(function($stateProvider){
  $stateProvider.state('order', {
      templateUrl: '/js/order/order.html',
      url:'/users/:userId',
      controller: function(orders, $scope){
        //be consistent - camel case or snake case
        $scope.placed_orders = orders.filter(function(it){
          return it.status === 'placed';
        });
        $scope.created_orders = orders.filter(function(it){
          return it.status === 'created';
        });
      },
      resolve: {
        orders: function(UserFactory, $stateParams){
          //you could also do your filtering here.. or better yet have the factory do it... 
          return UserFactory.getUserOrders($stateParams.userId);
        }
      }
  });
});
