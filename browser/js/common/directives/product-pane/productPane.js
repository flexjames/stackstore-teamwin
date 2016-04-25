app.directive('productPane', function(){
  return {
    scope:{
      product: '='
    },
    templateUrl: 'js/common/directives/product-pane/product-pane.html'
  };
});
