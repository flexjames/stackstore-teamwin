app.config(function($stateProvider){
  $stateProvider
    .state('admin', {
      templateUrl: '/js/admin/admin.html',
      url: '/admin',
      abstract: true,
      controller: function($scope){
        $scope.links = [
          {text: 'Users', state: 'admin.users'},
          {text: 'Products', state: 'admin.products'},
          {text: 'Orders', state: 'admin.orders'},
          {text: 'Categories', state: 'admin.categories'}
        ];
      }
    })
    .state('admin.users', {
      templateUrl: '/js/admin/admin-users.html',
      url: '/users'
    })
    .state('admin.products', {
      templateUrl: '/js/admin/admin-products.html',
      url: '/products'
    })
    .state('admin.orders', {
      templateUrl: '/js/admin/admin-orders.html',
      url: '/orders'
    })
    .state('admin.categories', {
      templateUrl: '/js/admin/admin-categories.html',
      url: '/categories'
    });
});
