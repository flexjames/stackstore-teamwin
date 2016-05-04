app.config(function($stateProvider){
	$stateProvider.state('signup', {
		url:'/signup',
		templateUrl: 'js/signup/signup.html',
		controller: function($scope, $state, AuthService, AdminFactory, CartFactory){
			$scope.newUser = {
				email: '',
				password: ''
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
				});
			};
		}
	});
});
