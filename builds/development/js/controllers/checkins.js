myApp.controller('CheckInsController',
  function($scope, $rootScope, $firebase, $routeParams, $firebaseSimpleLogin, $location, FIREBASE_URL, Authentication) {
    $scope.whichmeeting = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    var checkinsRef = new Firebase(FIREBASE_URL + "/users/" + $scope.whichuser + "/meetings/" + $scope.whichmeeting + '/checkins');
    var checkinsList = $firebase(checkinsRef).$asArray();

    $scope.checkins = checkinsList;

    $scope.addCheckin = function() {
      var checkinsObj = $firebase(checkinsRef);

      var myData = {
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date: Firebase.ServerValue.TIMESTAMP
      };
      checkinsObj.$push(myData).then(function() {
        $location.path('/checkins/' + $scope.whichuser + "/" + $scope.whichmeeting + "/details" );
      });
    } //addCheckIn

    $scope.deleteCheckin = function(id) {
      var record = $firebase(checkinsRef);
      record.$remove(id);
    } //deleteCheckIn

}); //CheckInsController

