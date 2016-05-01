app.directive('starsRating', function(){
  return {
    scope: {
      numstars: '=',
      editable: '=',
      model: '='
    },
    templateUrl: '/js/common/directives/stars-rating/stars-rating.html',
    controller: function($scope){
      $scope.stars = [
        {on: false}, {on: false}, {on: false}, {on: false}, {on: false}
      ];

      $scope.changeRating = function(idx){
        if ($scope.model)
          $scope.model.stars= idx;
        if ($scope.numstars || $scope.editable){
          $scope.stars.forEach(function(it){
            it.on = false;
          });
          while(idx--)
            $scope.stars[idx].on = true;
        }

      };

      if ($scope.numstars)
        $scope.changeRating(Number($scope.numstars));

    }

  };
});
