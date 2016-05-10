app.config(function($stateProvider){
  $stateProvider
  .state('admin.orders', {
    templateUrl: '/js/admin/orders/admin-orders.html',
    url: '/orders',
    controller: function(users, orders, $scope, AdminFactory){
      var _orders = $scope.orders = orders;
      $scope.users = users;
      $scope.filterOrders = function(status){
        if (status){
          $scope.orders = _orders.filter(function(it){
            return it.status === status;
          });
        }else {
          $scope.orders = _orders;
        }
      };
    },
    resolve: {
      orders: function(AdminFactory){
        return AdminFactory.getAllOrders();
      },
      users: function(AdminFactory){
        return AdminFactory.getUsers();
      }
    }
  });
});
