app.config(function ($stateProvider) {
	$stateProvider.state('product-detail', {
		url: '/product/:productId',
		templateUrl: 'js/product/product.html'
	});
});