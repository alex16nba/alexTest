var userControllers = angular.module('userControllers', ['ngAnimate', 'firebase']);

userControllers.controller('CheckInController', ['$scope', '$firebase', '$location', function($scope, $firebase, $location) {
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
}]); //userControllers

userControllers.controller('ListController', ['$scope', '$firebase', function($scope, $firebase) {
  var ref = new Firebase("https://attendance100.firebaseio.com/");
  $scope.users = $firebase(ref).$asArray();
}]);

userControllers.controller('EditController', ['$scope', '$firebase', '$routeParams', function($scope, $firebase, $routeParams) {
  var ref = new Firebase("https://attendance100.firebaseio.com/" + $routeParams.itemId);
  var sync = $firebase(ref);
  $scope.user = sync.$asObject();
  $scope.user.$bindTo($scope, "user");
}]);