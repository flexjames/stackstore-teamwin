app.directive('scatter', function(){
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
                type: 'scatterChart',
                height: 450,
                color: d3.scale.category10().range(),
                scatter: {
                    onlyCircles: true
                },
                showDistX: true,
                showDistY: true,
                tooltipContent: function(key) {
                    return '<h3>' + key + '</h3>';
                },
                duration: 350,
                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format('1')(d);
                    },
                    axisLabelDistance: -5
                },
                zoom: {
                    //NOTE: All attributes below are optional
                    enabled: false,
                    useFixedDomain: false,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: false,
                    unzoomEventType: 'dblclick.zoom'
                }
            }
        };

        $scope.data = generateData();

        /* Random Data Generator (took from nvd3.org) */
        function generateData(groups) {
            var data = [],
                random = d3.random.normal();

            for (var i = 0; i < $scope.products.length; i++) {
                var product = $scope.products[i];
                data.push({
                    key: product.name,
                    values: [{
                      x: product.price,
                      y: product.quantity,
                      size: Math.random()
                    }]
                });

            }
            return data;
          }


      



    }
  };
});
