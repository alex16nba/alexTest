myApp.controller('RegistrationController',
  function($scope, $location, Authentication) {

  $scope.login = function() {
    Authentication.login($scope.user)
      .then(function(user) {
        $location.path('/meetings');
    }, function (error) {
      $scope.error = error.toString(); 
    });
  } //login

  $scope.$on('$firebaseSimpleLogin:login', function () {
    $location.path('/meetings');
  });

  $scope.register = function() {
    Authentication.register($scope.user)
      .then(function(authUser) {
        Authentication.login($scope.user);
      }, function (error) {
      $scope.error = error.toString(); 
    });//authuser
  } //register

}); //AuthController