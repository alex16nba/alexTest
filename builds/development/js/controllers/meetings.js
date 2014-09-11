myApp.controller('MeetingsController',
  function($scope, $rootScope, $firebase, $firebaseSimpleLogin, $location, FIREBASE_URL, Authentication) {

  var firebaseRef = new Firebase(FIREBASE_URL);
  var simpleLogin = $firebaseSimpleLogin(firebaseRef);

  //make sure the user's logged in
  $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
    var meetingsRef = new Firebase(FIREBASE_URL + "/users/" + authUser.uid + "/meetings/");
    var meetings = $firebase(meetingsRef);
    $scope.meetings = meetings.$asObject();
    $scope.checkForMeetings = meetings.$asArray().length !== 0;
    $scope.user = authUser.uid;

    $scope.addMeeting = function() {
      meetings.$push({
        name: $scope.meetingname,
        date: Firebase.ServerValue.TIMESTAMP
      }).then(function() {
        $scope.meetingname='';
      });
    } //addmeeting

    $scope.deleteMeeting = function(key) {
      var recordRef = new Firebase(FIREBASE_URL + "/users/" + authUser.uid + "/meetings/");
      var record = $firebase(recordRef);
      record.$remove(key);
    } //addmeeting

    $scope.checkForMeetings = function() {
      return meetings.$asArray().length !== 0;
    } //addmeeting

  }); // users logged in
}); //NavController