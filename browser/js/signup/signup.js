app.config(function($stateProvider){
	$stateProvider.state('signup', {
		url:'/signup',
		templateUrl: 'js/signup/signup.html',
		controller: function($scope, $state, AdminFactory){
			$scope.newUser = {
				email: '',
				password: ''
			}

			$scope.createUser = function(){
				AdminFactory.createUser($scope.newUser)
				.then(function(user){
					// $state.go('user', {id: user._id});
					console.log(user);
					$state.go('home');
				});
			};


			$scope.goHome = function(){
				$state.go('home');	
			}
		}
	});
});