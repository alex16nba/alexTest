var appControllers = angular.module('appControllers', ['ngAnimate', 'firebase']);

// Register a User --------------------------------------------------------
appControllers.controller('RegisterController', 
    ['$scope', '$firebase', '$location', 'appInfo',
    function($scope, $firebase, $location, appInfo) {

    var ref = new Firebase("https://attendance100.firebaseio.com/users");
    var users = $firebase(ref);

    //once user submits registration form
    $scope.register = function() {
      var myDate = new Date().getTime();

      //create the user through the appInfo factory object
      appInfo.loginObj.$createUser($scope.email, $scope.password)
      .then(function(user) { //if user is successfully created


      users.$push({
        date: myDate,
        firstname: $scope.firstname,
        lastname: $scope.lastname,
        email: $scope.email
      }); //postsRef

    }, function(error) {
      $scope.loginMessage = error.message;
    }); //user Creation
  } //Register
}]); // RegisterController




// Login --------------------------------------------------------
appControllers.controller('LogInController', ['$scope', 'appInfo', '$location', function($scope, appInfo, $location) {
    if (appInfo.loginObj.user !== null) {
      $scope.loggedin= true;
      $scope.user = appInfo.loginObj.user;
      console.log(appInfo.loginObj);
      // $location.path('/meetings');
    }

    $scope.login = function() { //clicked login button
      appInfo.loginObj.$login("password", {
        email: $scope.email,
        password: $scope.password
      }).then(function(user) {
        //$location.path('/meetings');
      }, function(error) {
       $scope.loginMessage = error.message;
     });      
    } //clicked login button

    $scope.logout = function() { //clicked logout
      appInfo.loginObj.$logout().then(function(user) {
        console.log('loggingout');
      }, function(error) {
       $scope.loginMessage = error.message;
     });      
    } //clicked login button


}]); // Login


// Meetings Checkins
appControllers.controller('MeetingsController',
  ['$scope', '$firebase', 'appInfo', function(
  $scope, $firebase, appInfo) {
    if (appInfo.loginObj) {
      var sync = $firebase(appInfo.ref);

      console.log(appInfo.ref);

    } else {
      $location.path('/login');
    }
  //$scope.users = $firebase(ref).$asArray();
}]); //MeetingsController

// Check Users Into Event
appControllers.controller('CheckInController', ['$scope', '$firebase', '$location', function($scope, $firebase, $location) {
    var ref = new Firebase("https://attendance100.firebaseio.com/");
    $scope.submitForm = function() { 
      var postsRef = ref;
      var loginDate = new Date().getTime();
      postsRef.push({
        firstname: $scope.firstname,
        date: loginDate,
        lastname: $scope.lastname,
        email: $scope.email,
      }); //postsRef
      $location.path('/list');
    }; //submitForm
}]); //CheckInController

// List Checkins
appControllers.controller('ListController', ['$scope', 'appInfo', function($scope, appInfo) {
  console.log(appInfo);
  //$scope.users = $firebase(ref).$asArray();
}]); //ListController

// Edit Checkins
appControllers.controller('EditController', ['$scope', '$firebase', '$routeParams', function($scope, $firebase, $routeParams) {
  var ref = new Firebase("https://attendance100.firebaseio.com/" + $routeParams.itemId);
  var sync = $firebase(ref);
  $scope.user = sync.$asObject();
  $scope.user.$bindTo($scope, "user");
}]); //EditController