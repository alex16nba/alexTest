myApp.controller('CheckInsController',
  function($scope, $rootScope, $firebase, $routeParams, $firebaseSimpleLogin, $location, FIREBASE_URL, Authentication) {
    $scope.whichmeeting = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;
    $scope.order = 'lastname';
    $scope.direction = true;
    $scope.limit = 999;

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
        $location.path('/checkins/' + $scope.whichuser + "/" + $scope.whichmeeting + "/checkinsList" );
      });
    } //addCheckIn

    $scope.deleteCheckin = function(id) {
      var record = $firebase(checkinsRef);
      record.$remove(id);
    } //deleteCheckIn

    $scope.pickWinner = function() {
      var rand = function(){
         var num = Math.random() - 0.5;
        return num;
      };
      $scope.limit = 1;
    } //pickwinner

    $scope.resetCheckins = function() {
      $scope.order = 'lastname';
      $scope.direction = true;
      $scope.limit = 999;
    } //resetCheckins

    $scope.showLove = function(myItem) {
      myItem.show =!myItem.show;
      if (myItem.userState=='expanded') {
        myItem.userState=''; 
      } else {
        myItem.userState='expanded'; 
      }
    } //showLove

    $scope.giveLove = function(myItem, myGift) {
      var ref = new Firebase(FIREBASE_URL + "/users/" + $scope.whichuser + "/meetings/" + $scope.whichmeeting + '/checkins/' + myItem.$id + '/awards');
      var checkinsObj = $firebase(ref);
      var myData = {
        name: myGift,
        date: Firebase.ServerValue.TIMESTAMP
      };
      checkinsObj.$push(myData);
    } //showLove

    $scope.deleteAward = function(checkinId, award) {
      var ref = new Firebase(FIREBASE_URL + "/users/" + $scope.whichuser + "/meetings/" + $scope.whichmeeting + '/checkins/' + checkinId + '/awards');
      var record = $firebase(ref);
      record.$remove(award);
    } //deleteAward

}); //CheckInsController

