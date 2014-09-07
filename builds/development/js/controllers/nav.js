myApp.controller('NavController',
  function($scope, $location, Authentication) {

  $scope.logout = function() {
    Authentication.logout()
    $location.path('/login');
  } //logout

  $scope.$on('$firebaseSimpleLogin:logout', function () {
    $location.path('/login');
  });


}); //NavController