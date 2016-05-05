app.config(function($stateProvider){
  $stateProvider
  .state('admin.products', {
    templateUrl: '/js/admin/products/admin-products.html',
    url: '/products',
    controller: function(products, $scope, AdminFactory, $state){
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
      $scope.createNewProduct = function(){
        AdminFactory.createProduct().then(function(product){
          $state.go('admin.productsEdit', {productId: product._id});
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
