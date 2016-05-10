app.directive('donutChart', function(){
  return {
    template: '<nvd3 data="data" options="options"></nvd3>',
    scope: {
      categories: '=',
      orders: '='
    },
    controller: function($scope){
      $scope.options = {
            chart: {
                type: 'pieChart',
                height: 400,
                donut: true,
                x: function(d){
                  return d.key;
                },
                y: function(d){
                  return d.y;
                },
                showLabels: true,

                pie: {
                    startAngle: function(d) {
                      return d.startAngle/2 -Math.PI/2;
                    },
                    endAngle: function(d) {
                      return d.endAngle/2 -Math.PI/2;
                    }
                },
                duration: 500,
                legend: {
                    margin: {
                        top: 5,
                        right: 70,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };
        function generateData(category){
          var itemsByCategory = [];
          for(var i = 1; i < 31; i++){
            var date = new Date('4/'+ i + '/16');
            var ordersForDay = $scope.orders.filter(function(it){
              return new Date(it.created).getTime() == date.getTime();
            });
            if (ordersForDay.length){
              for(var j in ordersForDay){
                for(var k in ordersForDay[j].items){
                  var item = ordersForDay[j].items[k];
                  if (item.product.category.indexOf(category._id) > -1)
                   itemsByCategory.push(item);
                }
              }
            }

        }
        var total = itemsByCategory.reduce(function(acc, it){
          return acc + (it.price);
        },0);
        return total;
      }
      $scope.data = $scope.categories.map(function(cat){
        return {
          key: cat.name,
          y: generateData(cat)
        };
      });
        // $scope.data = [
        //     {
        //         key: "One",
        //         y: 5
        //     },
        //     {
        //         key: "Two",
        //         y: 2
        //     },
        //     {
        //         key: "Three",
        //         y: 9
        //     },
        //     {
        //         key: "Four",
        //         y: 7
        //     },
        //     {
        //         key: "Five",
        //         y: 4
        //     },
        //     {
        //         key: "Six",
        //         y: 3
        //     },
        //     {
        //         key: "Seven",
        //         y: .5
        //     }
        // ];
    }
  };
});
