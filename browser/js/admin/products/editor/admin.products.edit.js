app.config(function($stateProvider){
  $stateProvider
    .state('admin.productsEdit',{
      url: '/products/:productId',
      templateUrl: '/js/admin/products/editor/admin-product-edit.html',
      controller: function(product, categories, $scope){
        $scope.product = product;
        $scope.categories = categories;
        $scope.checkCategory = function(category){
          return $scope.product.category.indexOf(category._id) > -1;
        };
        $scope.onChange = function(category){
          var idx = $scope.product.category.indexOf(category._id);
          if (idx === -1)
            $scope.product.category.push(category._id);
          else
            $scope.product.category.splice(idx, 1);
        };
      },
      resolve: {
        product:function(ProductsFactory, $stateParams){
          return ProductsFactory.fetchById($stateParams.productId);
        },
        categories: function(CategoryFactory){
          return CategoryFactory.fetchAll();
        }
      }

    });
});
