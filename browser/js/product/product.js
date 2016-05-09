app.config(function ($stateProvider) {
    $stateProvider.state('product-detail', {
        url: '/product/:productId',
        templateUrl: 'js/product/product.html',
        controller: function ($scope, $rootScope, product, CartFactory, Session, UtilFactory, UserFactory, AuthService, ProductsFactory) {
          //lots of dependencies here-- this is an indication that you might want to aggregate some of these into a factory/service
            $scope.product = product;
            $scope.makeNew = false;//you're doing this twice-- see notes below-- you might want to have a method called resetReview() { $scope.makeNew = false; }
            $scope.quantity = 1;
            $scope.newReview = {};

            $scope.getQuantity = function () {
                var total;
                if (product.quantity < 10)
                    total = product.quantity;
                else
                    total = 10;//interesting

                var quantityArray = [];

                for (var i = 1; i <= total; i++) {
                   quantityArray.push(i);//this is just an array of ints?
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
                  //after submitting review you are basically 'resetting the review'.. how about a method resetReview(){ $scope.makeName = false; }
                  $scope.makeNew = false;
                  $scope.product.reviews.push(product.reviews[product.reviews.length -1]);
                });
              }
            };

            $scope.userHasReviewed = function(){
              if (Session.user){
                var users = $scope.product.reviews.map(function(it){
                  return it.author;
                });
                return users.indexOf(Session.user._id) > -1;
              }
              return false;
            };
        },
        resolve: {
            product: function (ProductsFactory, $stateParams) {
                return ProductsFactory.fetchById($stateParams.productId);
            }
        }
    });
});
