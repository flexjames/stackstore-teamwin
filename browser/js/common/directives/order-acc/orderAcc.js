app.directive('orderAcc', function(){
  return {
    templateUrl: 'js/common/directives/order-acc/order-acc.html',
    scope: {
      orders: '='
    }
  };
});
