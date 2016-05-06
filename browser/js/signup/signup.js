app.config(function($stateProvider){
	$stateProvider.state('signup', {
		url:'/signup',
		templateUrl: 'js/signup/signup.html',
		controller: function($scope, $state, AuthService, AdminFactory, CartFactory, Session){
			$scope.newUser = {
				email: '',
				password: ''
			};

			console.log(Session.user);

			$scope.checkUser = function(){
				if (Session.user)
					return true;
				else
					return false;
			}

			$scope.changeValue = function(){
				$scope.emailTaken = false;
				$scope.NewUserForm.$setUntouched();
			};

			//use Session.user to check if a user is coming
			//with a passwordReset:true, use AdminFActory
			//to do a put request and edit passwordReset
			//and update new password. 

			$scope.updatePW = function(){
				AdminFactory.editUser(Session.user._id, {password: $scope.newUser.password, passwordReset: false})
				.then(function(user){
					$state.go('home');
				});
			};

			$scope.createUser = function(){
				AdminFactory.createUser($scope.newUser)
				.then(function(user){
					return AuthService.login($scope.newUser);
				})
				.then(function(user){
					return CartFactory.initCart();
				})
				.then(function(){
					$state.go('home');
				})
				.catch(function(err){
					//OM: need to handle errors better,
					//db prevents records from having duplicate emails
					console.log(err);
					if (err){
						$scope.emailTaken = true;
					};
				});
			};
		}
	});
});
