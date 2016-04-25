app.directive('productPane', function(){
  return {
    scope:{
      product: '='
    },
    templateUrl: 'js/common/directives/navbar/navbar.html'
  };
});
