app.factory('UserFactory', function($http){
  return {
    getUserOrders: function(userId){
      return $http.get('/api/users/' + userId + '/orders')
      .then(function(res){
        return res.data;
      });
    }
  };
});
