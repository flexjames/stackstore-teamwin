app.config(function($stateProvider){
  $stateProvider
    .state('admin.productsEdit',{
      url: '/products/:productId',
      templateUrl: '/js/admin/products/editor/admin-product-edit.html',
      controller: function(product, $scope){
        $scope.product = product;
      },
      resolve: {
        product:function(ProductsFactory, $stateParams){
          return ProductsFactory.fetchById($stateParams.productId);
        }
      }

    });
});
