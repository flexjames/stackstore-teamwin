app.factory('ProductsFactory', function($http){
	var ProductsFactory = {};

	ProductsFactory.fetchAll = function(){
		return $http.get('/products/')
		.then(function(response){
			return response;
		});
	};

	ProductsFactory.fetchById = function(id){
		return $http.get('/products/' + id)
		.then(function(response){
			return response;
		});
	};

	ProductsFactory.fetchByCategory = function(category){
		return $http.get('/products/' + category)
		.then(function(respose){
			return response.data;
		});
	};

	ProductsFactory.create = function(data){
		return $http.post('/products/', data)
		.then(function(response){
			return response.data;
		});
	};

	ProductFactory.edit = function(id, data){
		return $http.put('/products/:id', data)
		.then(function(response){
			return response;
		});
	};

	ProductsFactory.delete = function(id){
		return $http.delete('/product/' + id);
	};


	return ProductsFactory;
});
