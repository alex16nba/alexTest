var myApp = angular.module('myApp', [
  'ngRoute',
  'appControllers'
]);

//Make FireBase Credentials Available
myApp.factory('appInfo', function($firebase, $firebaseSimpleLogin) {
  var myObj = {};
  var ref = new Firebase("https://attendance100.firebaseio.com/");
  var usersref = new Firebase("https://attendance100.firebaseio.com/users");
  myObj.loginObj = $firebaseSimpleLogin(ref);
  myObj.database = $firebase(ref);
  myObj.users = $firebase(usersref);

  return myObj;
});

//Link Routes to Templates & Controllers
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/register', {
    templateUrl: 'partials/register.html',
    controller: 'RegisterController'
  }).
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LogInController'
  }).
  when('/meetings', {
    templateUrl: 'partials/meetings.html',
    controller: 'MeetingsController'
  }).
    when('/list', {
    templateUrl: 'partials/list.html',
    controller: 'ListController'
  }).
  when('/edit/:itemId', {
    templateUrl: 'partials/edit.html',
    controller: 'EditController'
  }).
  when('/checkin', {
    templateUrl: 'partials/checkin.html',
    controller: 'CheckInController'
  }).
  otherwise({
    redirectTo: '/login'
  });
}]);
