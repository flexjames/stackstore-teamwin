app.config(function($stateProvider){
	$stateProvider
	.state('admin.users', {
	  templateUrl: '/js/admin/users/admin-users.html',
	  url: '/users',
	  controller: function(users, $scope, AdminFactory, Session){
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

			$scope.currentUser = function(){
				return Session.user;
			};

	  	$scope.editUser = function(_user, data){
	  		AdminFactory.editUser(_user._id, data)
	  		.then(function(user){
	  			_user.isAdmin = user.isAdmin;
					_user.passwordReset = user.passwordReset;
	  		});
	  	};
	  },
	  resolve: {
	  	users: function(AdminFactory){
	  		return AdminFactory.getUsers();
	  	}
	  }
	});
});
