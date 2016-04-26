app.config(function ($stateProvider) {
    $stateProvider.state('product-detail', {
        url: '/product/:productId',
        templateUrl: 'js/product/product.html',
        controller: function ($scope, product) {
            $scope.product = product;

            $scope.getQuantity = function () {
                var total;
                if (product.quantity < 10)
                    total = product.quantity;
                else
                    total = 10;
                
                var quantityArray = [];

                for (var i = 1; i <= total; i++) {
                   quantityArray.push(i);
                }
                return quantityArray;
            };
            

            $scope.getStars = function(product){
                return new Array(product.stars);
            }
        },
        resolve: {
            product: function (ProductsFactory, $stateParams) {
                return ProductsFactory.fetchById($stateParams.productId);
            }
        }
    });
});