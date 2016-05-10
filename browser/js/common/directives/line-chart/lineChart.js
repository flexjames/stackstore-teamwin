app.directive('lineChart', function(){
  return {
    template: '<nvd3 options="options" data="data"></nvd3>',
    scope: {
      orders: '=',
      categories: '='
    },
    controller: function($scope){
      $scope.options = {
           chart: {
               type: 'lineChart',
               height: 250,
               margin : {
                   top: 20,
                   right: 20,
                   bottom: 60,
                   left: 65
               },
               x: function(d){ return d[0]; },
               y: function(d){ return d[1]; },
               //average: function(d) { return d.mean/100; },

               color: d3.scale.category10().range(),
               duration: 300,
               useInteractiveGuideline: true,
               clipVoronoi: false,

               xAxis: {
                   axisLabel: 'X Axis',
                   tickFormat: function(d) {
                       return d3.time.format('%m/%d/%y')(new Date(d))
                   },
                   showMaxMin: false,
                   staggerLabels: true
               },

               yAxis: {
                   axisLabel: 'Y Axis',
                   tickFormat: function(d){
                       return '$' + d;
                   },
                   axisLabelDistance: 20
               }
           }
       };

       function generateData(category){
         var data =[];
         for(var i = 1; i < 31; i++){
           var date = new Date('4/'+ i + '/16');
           var ordersForDay = $scope.orders.filter(function(it){
             return new Date(it.created).getTime() == date.getTime();
           });
           var itemsByCategory = [];
           if (ordersForDay.length){
             for(var j in ordersForDay){
               for(var k in ordersForDay[j].items){
                 var item = ordersForDay[j].items[k];
                 if (item.product.category.indexOf(category._id) > -1)
                  itemsByCategory.push(item);
               }
             }
           }
          data.push([date, itemsByCategory.reduce(function(acc, it){
            return acc + (it.price);
          },0)]);
         }
         return data;
       }

       $scope.data = $scope.categories.map(function(cat){
         return {
           key: cat.name,
           values: generateData(cat)
         };
       });
    }
  };
});
