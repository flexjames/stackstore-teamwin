app.config(function($stateProvider){
	$stateProvider
	.state('admin.users', {
	  templateUrl: '/js/admin/users/admin-users.html',
	  url: '/users',
	  controller: function(users, $scope, AdminFactory, $window){
	  	$scope.users = users;

	  	$scope.removeUser = function(id){
	  		AdminFactory.deleteUser(id)
	  		.then(function(){
	  			AdminFactory.getUsers()
	  			.then(function(users){
	  				$scope.users = users;
	  			});
	  		});
	  	};

	  	$scope.resetPW = function(id, data){
	  		AdminFactory.editUser(id, data);
	  	};

	  	$scope.promoteUser = function(_user, data){
	  		AdminFactory.editUser(_user._id, data)
	  		.then(function(user){
	  			return _user.isAdmin = user.isAdmin;
	  		});
	  	};
	  },
	  resolve: {
	  	users: function(AdminFactory){
	  		return AdminFactory.getUsers();
	  	}
	  }
	})
})