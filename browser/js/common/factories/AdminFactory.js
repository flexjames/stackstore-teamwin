app.factory('AdminFactory', function($http){
	var AdminFactory = {};

	AdminFactory.createUser = function(data){
		return $http.post('/api/users', data)
		.then(function(response){
			return response.data;
		});
	};
	AdminFactory.getAllOrders = function(){
		return $http.get('/api/orders').then(function(res){
			return res.data;
		})
		.catch(function(err){
			console.log(err);
		});
	};

	AdminFactory.deleteUser = function(id){
		return $http.delete('/api/users/' + id);
	};

	AdminFactory.editUser = function(id, data){
		return $http.put('/api/users/' + id)
		.then(function(response){
			return response.data;
		});
	};

	AdminFactory.createCat = function(name){
		return $http.put('/api/categories/' + name)
		.then(function(response){
			return response.data;
		});
	};

	AdminFactory.deleteCat = function(id){
		return $http.delete('/api/categories/' + id);
	};

	AdminFactory.createProduct = function(data){
		return $http.post('/api/products', data)
		.then(function(response){
			return response.data;
		});
	};

	AdminFactory.deleteProduct = function(id){
		return $http.delete('/api/products/' + id);
	};

	AdminFactory.editProduct = function(id, data){
		return $http.put('/api/products/' + id, data)
		.then(function(response){
			return response.data;
		});
	};

	AdminFactory.editOrder = function(id, data){
		return $http.put('/api/orders/' + id, data)
		.then(function(res){
			return res.data;
		});
	};


	return AdminFactory;
});
