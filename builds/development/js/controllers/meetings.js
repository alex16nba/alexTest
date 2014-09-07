myApp.controller('MeetingsController',
  function($scope, $location, Authentication) {

  $scope.$on('$firebaseSimpleLogin:login', function () {
    console.log(Authentication.signedIn());
  });

}); //NavController