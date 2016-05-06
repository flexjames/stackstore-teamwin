app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, AUTH_EVENTS, Session, CartFactory) {

    $scope.$on(AUTH_EVENTS.loginSuccess, function(){
      return CartFactory.initCart()
      .then(function(){
        if (Session.user.passwordReset)
          $state.go('signup');
      });

      // if (CartFactory.isCart()) {//If anon user has begun filling cart
      //   return CartFactory.sendCartToApi().then(function(cart){
      //     CartFactory.setCart(cart);
      //   });//TO DO: add merging of carts
      // }
      // else if (!CartFactory.isCart() && user) {
      //   return CartFactory.fetchOrders(user._id).then(function(orders){
      //     if (orders.length)
      //       CartFactory.setCart(orders[orders.length -1]);
      //     else {
      //       return CartFactory.sendCartToApi().then(function(cart){
      //         return CartFactory.setCart(cart);
      //       });
      //     }
      //   });
      // }
    });

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
