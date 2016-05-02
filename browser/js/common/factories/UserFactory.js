app.factory('UserFactory', function($http){
  return {
    getUserOrders: function(userId){
      return $http.get('/api/users/' + userId + '/orders')
      .then(function(res){
        return res.data;
      });
    },
    removeOrder: function(orderId){
      return $http.delete('/api/orders/' + orderId);
    },
    getOneUser: function(userId){
      return $http.get('/api/users/' + userId).then(function(res){
        return res.data;
      });
    }
  };
});
