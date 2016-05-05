app.filter('status', function(){
  return function(input, status){
    return input.filter(function(it){
      return it.status === status;
    });
  };
});
