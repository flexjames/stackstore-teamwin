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
    });
});
