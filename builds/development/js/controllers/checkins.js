myApp.controller('CheckInsController',
  function($scope, $rootScope, $firebase, $routeParams, $firebaseSimpleLogin, $location, FIREBASE_URL, Authentication) {
    $scope.whichmeeting = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    var checkinsRef = new Firebase(FIREBASE_URL + "/users/" + $scope.whichuser + "/meetings/" + $scope.whichmeeting + '/checkins');
    var checkins = $firebase(checkinsRef);

    $scope.addMeeting = function() {
      var myData = {
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date: Firebase.ServerValue.TIMESTAMP
      };
      checkins.$push(myData).then(function() {
        $location.path('/checkins/' + $scope.whichmeeting + "/" + $scope.whichuser + "/details" );
      });
    } //addmeeting
}); //NavController