myApp.controller('AuthController',
  function($scope, $location, Auth) {

  if (Auth.signedIn()) {
    $location.path('/meetings');
  } //SignedIn

  $scope.register = function() {

    console.log($scope.user);

    Auth.register($scope.user)
      .then(function(authUser) {
        console.log(authUser);
        $location.path('/meetings');
      });//authuser
  } //register

}); //AuthController