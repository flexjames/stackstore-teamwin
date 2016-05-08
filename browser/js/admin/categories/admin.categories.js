app.config(function($stateProvider){
	$stateProvider
	.state('admin.categories', {
		templateUrl: '/js/admin/categories/admin-categories.html',
		url: '/categories',
		controller: function(categories, $scope, AdminFactory){
			$scope.categories = categories;

			$scope.createCat = function(){
				$scope.showCreate = true;
			}

			$scope.addCat = function(name){
				$scope.catName = null;
				$scope.showCreate =false;
				AdminFactory.createCat(name)
				.then(function(cat){
					$scope.categories.push(cat);
				})
			}

			$scope.removeCat = function(cat){
				AdminFactory.deleteCat(cat._id)
				$scope.categories.splice(categories.indexOf(cat),1)				
			}

			$scope.setImageUrl = function(category){
        var extension = $scope.file.name.substring($scope.file.name.lastIndexOf('.'));
        $scope.category = category;
        $scope.category.imageUrl = "/images/categories/uploads/" + $scope.category._id + extension;
      };
		},
		resolve: {
			categories: function(CategoryFactory){
				return CategoryFactory.fetchAll();
			}
		}
	})
})