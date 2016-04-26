app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function ($scope, $state) {

        controller: function(products, categories, $scope){
          $scope.products = products;
          $scope.categories = categories;
          console.log(products);

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

