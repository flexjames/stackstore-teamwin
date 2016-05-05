app.config(function($stateProvider){
  $stateProvider
  .state('admin.products', {
    templateUrl: '/js/admin/products/admin-products.html',
    url: '/products',
    controller: function(products, $scope, AdminFactory){
      $scope.products = products;
      $scope.deleteProduct = function(product){
        AdminFactory.deleteProduct(product._id)
        .then(function(){
          $scope.products.splice($scope.products.indexOf(product), 1);
        });
      };
      $scope.toggleAvailability = function(product, val){
        AdminFactory.editProduct(product._id, {available: val})
        .then(function(){
          product.available = val;
        });
      };
    },
    resolve: {
      products: function(ProductsFactory){
          return ProductsFactory.fetchAll(false);
      }
    }
  });
});
