app.directive('pieChart', function(){
  return {
    template: '<nvd3 options="options" data="data"></nvd3>',
    transclude: true,
    scope: {
      products: '=',
      categories: '='
    },
    controller: function($scope){
      $scope.options = {
            chart: {
                type: 'pieChart',
                height: 300,
                x: function(d){
                  return d.key;
                },
                y: function(d){
                  return d.y;
                },
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.data = generateData();

        function generateData(){
          var data = correlate();
          return Object.keys(data).map(function(it){
            return {
              key: it,
              y: data[it].length
            };
          });
        }
        function correlate(){
          var data = {};
          for(var i in $scope.categories){
            var cat = $scope.categories[i];
            data[cat.name] = $scope.products.filter(function(it){
              return it.category.indexOf(cat._id) > -1;
            });
          }
          return data;
        }


    }
  };
});
