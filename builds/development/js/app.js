"use strict";

var myApp = angular.module('myApp', [
  'ngRoute',
  'appControllers'
])
.constant('FIREBASE_URL', 'https://attendance100.firebaseio.com');

//Make FireBase Credentials Available
myApp.factory('appInfo',
  function($firebase, FIREBASE_URL, $firebaseSimpleLogin) {
  var myObj = {};
  var ref = new Firebase(FIREBASE_URL);
  var usersref = new Firebase("https://attendance100.firebaseio.com/users");
  myObj.loginObj = $firebaseSimpleLogin(ref);


  myObj.ref = $firebase(ref);
  myObj.users = $firebase(usersref);
  return myObj;
});

//Link Routes to Templates & Controllers
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/register', {
    templateUrl: 'views/register.html',
    controller: 'AuthController'
  }).
  when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LogInController'
  }).
  when('/meetings', {
    templateUrl: 'views/meetings.html',
    controller: 'MeetingsController'
  }).
    when('/list', {
    templateUrl: 'views/list.html',
    controller: 'ListController'
  }).
  when('/edit/:itemId', {
    templateUrl: 'views/edit.html',
    controller: 'EditController'
  }).
  when('/checkin', {
    templateUrl: 'views/checkin.html',
    controller: 'CheckInController'
  }).
  otherwise({
    redirectTo: '/login'
  });
}]);
