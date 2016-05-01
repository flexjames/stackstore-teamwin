app.config(function($stateProvider){
	$stateProvider.state('signup', {
		url:'/signup',
		templateUrl: 'js/signup/signup.html',
		controller: function($scope, $state, AdminFactory,$http){
			$scope.newUser = {
				email: '',
				password: ''
			}

			$scope.createUser = function(){
				AdminFactory.createUser($scope.newUser)
				.then(function(user){
					$state.go('order', {userId: user._id});
				});
			};


			$scope.goHome = function(){
				$state.go('home');	
			}
		}
	});
});