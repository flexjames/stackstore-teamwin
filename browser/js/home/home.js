app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function ($scope, $state) {

    //Will take in product id as parameter
    $scope.showProduct = function () {
        console.log('Show product');
        $state.go('product-detail', {productId: '12345'});
    };
});