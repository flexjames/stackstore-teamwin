app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function(ProductsFactory, $scope){
          ProductsFactory.fetchAll().then(function(products){
            console.log(products);
            $scope.products = products;
          });

        }
        // resolve: {
        //   products: function(ProductsFactory){
        //     return ProductsFactory.fetchAll();
        //   }
        // }
    });
});
