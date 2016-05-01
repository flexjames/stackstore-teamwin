app.config(function ($stateProvider) {
    $stateProvider.state('product-detail', {
        url: '/product/:productId',
        templateUrl: 'js/product/product.html',
        controller: function ($scope, product, CartFactory, Session, UtilFactory, UserFactory, AuthService, ProductsFactory) {
            $scope.product = product;
            $scope.makeNew = false;
            $scope.quantity = 1;
            $scope.newReview = {};

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


            $scope.getStars = UtilFactory.getStars;

            $scope.addToCart = function(product, quantity){
              CartFactory.addToCart(product, Number($scope.quantity));
              //TO DO: show a toast when items added to cart
            };
            $scope.getUser = function(userId, idx){
              UserFactory.getOneUser(userId).then(function(user){
                $scope.product.reviews[idx].useremail = user.email;
              });
            };
            $scope.isLoggedIn = AuthService.isAuthenticated;

            $scope.submitReview = function(){
              if ($scope.newReview){
                $scope.newReview.user = Session.user._id;
                return ProductsFactory.addReview($scope.product._id, $scope.newReview)
                .then(function(product){
                  $scope.makeNew = false;
                  $scope.product.reviews.push(product.reviews[product.reviews.length -1]);
                });
              }
            };
        },
        resolve: {
            product: function (ProductsFactory, $stateParams) {
                return ProductsFactory.fetchById($stateParams.productId);
            }
        }
    });
});
