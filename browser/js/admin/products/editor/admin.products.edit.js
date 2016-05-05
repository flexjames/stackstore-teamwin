app.config(function($stateProvider){
  $stateProvider
    .state('admin.productsEdit',{
      url: '/products/:productId',
      templateUrl: '/js/admin/products/editor/admin-product-edit.html',
      controller: function(product, categories, $scope, $state, AdminFactory){
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
        $scope.saveChanges = function(){
          try{
            $scope.product.price = Number($scope.product.price);
            $scope.product.quantity = Number($scope.product.quantity);
          }catch(err){
            $scope.err = true;
            return;
          }
          return AdminFactory.editProduct($scope.product._id, $scope.product)
          .then(function(){
            $state.go('admin.products');
          });
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
