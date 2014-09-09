myApp.controller('MeetingsController',
function($scope, $rootScope, $firebase, FIREBASE_URL) {

  $scope.addMeeting = function() {
    var meetingsRef = new Firebase(FIREBASE_URL + "/users/" + $rootScope.currentUser.$id + "/meetings/");
    var meetings = $firebase(meetingsRef);
    meetings.$push({ name: $scope.meetingname });

    $scope.meetings = meetings.$asObject();
  } //logout

}); //NavController