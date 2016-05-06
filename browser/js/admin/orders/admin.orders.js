app.config(function($stateProvider){
  $stateProvider
  .state('admin.orders', {
    templateUrl: '/js/admin/orders/admin-orders.html',
    url: '/orders',
    controller: function(orders, $scope, AdminFactory){
      var _orders = $scope.orders = orders;
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
      }
    }
  });
});
