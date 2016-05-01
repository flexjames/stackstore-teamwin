app.directive('starsRating', function(){
  return {
    scope: {
      numstars: '=',
      editable: '=',
      model: '=',
      avgstars: '=',
      hideborder: '='
    },
    templateUrl: '/js/common/directives/stars-rating/stars-rating.html',
    controller: function($scope){
      $scope.offValue = $scope.hideborder? '' : 'star_border';
      $scope.stars = [
        {on: false}, {on: false}, {on: false}, {on: false}, {on: false}
      ];


      $scope.changeRating = function(idx){
        if ($scope.model)
          $scope.model.stars= idx;
          $scope.stars.forEach(function(it){
            it.on = false;
          });
          while(idx--)
            $scope.stars[idx].on = true;

      };

      $scope.getAverage = function(){
        var avg = $scope.avgstars.reduce(function(acc,it){
         return  acc + it.stars;
       },0) / $scope.avgstars.filter(function(it){
         return it.stars > 0;
       }).length;
       if (avg)
        $scope.changeRating(Math.ceil(avg));
      };

      if($scope.avgstars)
        $scope.getAverage();

      if ($scope.numstars)
        $scope.changeRating(Number($scope.numstars));

    }


  };
});
