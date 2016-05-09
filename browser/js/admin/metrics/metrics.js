app.config(function($stateProvider){
  $stateProvider
    .state('admin.metrics', {
      url: '/metrics',
      templateUrl: '/js/admin/metrics/metrics.html',
      controller: function(products, categories, $scope){
        $scope.products = products;
        $scope.categories = categories;
      },
      resolve: {
        products: function(ProductsFactory){
          return ProductsFactory.fetchAll();
        },
        categories: function(CategoryFactory){
          return CategoryFactory.fetchAll();
        }
      }

    });
});
