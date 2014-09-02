var myApp = angular.module('myApp', [
  'ngRoute',
  'userControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/list', {
    templateUrl: 'partials/list.html',
    controller: 'ListController'
  }).
  when('/edit/:itemId', {
    templateUrl: 'partials/edit.html',
    controller: 'EditController'
  }).
  when('/', {
    templateUrl: 'partials/checkin.html',
    controller: 'CheckInController'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);