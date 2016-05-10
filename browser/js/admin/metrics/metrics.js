app.config(function($stateProvider){
  $stateProvider
    .state('admin.metrics', {
      url: '/metrics',
      templateUrl: '/js/admin/metrics/metrics.html',
      controller: function(products, categories, orders, $scope){
        $scope.products = products;
        $scope.categories = categories;
        $scope.orders = orders;
      },
      resolve: {
        products: function(ProductsFactory){
          return ProductsFactory.fetchAll();
        },
        categories: function(CategoryFactory){
          return CategoryFactory.fetchAll();
        },
        orders: function(AdminFactory){
          return AdminFactory.getAllOrders();
        }
      }

    });
});
