myApp.controller('NavController',
  function($scope, $rootScope, $firebase, $firebaseSimpleLogin, $location, FIREBASE_URL, Authentication) {

  var firebaseRef = new Firebase(FIREBASE_URL);
  var simpleLogin = $firebaseSimpleLogin(firebaseRef);

  $scope.logout = function() {
    Authentication.logout()
    $location.path('/login');
  } //logout


  $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
    var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
    var user = $firebase(ref).$asObject();

    user.$loaded().then(function() {
      $rootScope.currentUser = user;
    });

  });

 $rootScope.$on('$firebaseSimpleLogin:logout', function (e, authUser) {
    $rootScope.currentUser = {};
    $location.path('/login');
  });


}); //NavController