myApp.controller('NavController',
  function($scope, $location, Auth) {

  $scope.logout = function() {
    Auth.logout();
  } //log out

}); //NavController