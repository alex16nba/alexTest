myApp.controller('AuthController',
  function($scope, $location, Auth) {

  if (Auth.signedIn()) {
    $location.path('/meetings');
  } //SignedIn

  $scope.login = function() {

    Auth.login($scope.user)
      .then(function(loggedUser) {
        console.log('loggedin');
        console.log(loggedUser);
        //$location.path('/meetings');
    });

  } //login

  $scope.register = function() {

    Auth.register($scope.user)
      .then(function(authUser) {
        console.log('registered');
        console.log(authUser);
        Auth.login($scope.user)
          .then(function(loggedUser) {
            console.log('loggedin');
            console.log(loggedUser);
            //$location.path('/meetings');
          });
      });//authuser
  } //register

}); //AuthController