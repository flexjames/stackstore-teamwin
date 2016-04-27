app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function($scope, $state, products, categories) {
		 	$scope.products = products;
			$scope.categories = categories;
			console.log(products);

			$scope.showProduct = function (productId) {
		        console.log('Show product');
		        $state.go('product-detail', {productId: productId});
		    };
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
