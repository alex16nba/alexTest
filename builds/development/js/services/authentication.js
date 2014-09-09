myApp.factory('Authentication',
  function($firebase, $firebaseSimpleLogin, $location, FIREBASE_URL,
    $rootScope) {

  var firebaseRef = new Firebase(FIREBASE_URL);
  var simpleLogin = $firebaseSimpleLogin(firebaseRef);

  //Create temp object
  var myObject = {

    register: function(user) {

      return simpleLogin.$createUser(
        user.email, user.password)
        .then(function(regUser) {
          var firebaseUsersRef = new Firebase(FIREBASE_URL + 'users');
          var firebaseUsers = $firebase(firebaseUsersRef);
          var userInfo = {
              date: Firebase.ServerValue.TIMESTAMP,
              regUser: regUser.uid,
              md5: regUser.md5_hash,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email
            }
          firebaseUsers.$set(regUser.uid, userInfo);
        }); //add user
    }, //register

    login: function(user) {
      return simpleLogin.$login("password", {
        email: user.email,
        password: user.password
      });
    }, //login

    logout: function() {
      return simpleLogin.$logout();
    }, //logout

    signedIn: function() {
      return simpleLogin.user !== null;
    }, //signedin

  } // myObject

  //Create a function to test for sign-in
  $rootScope.signedIn = function() {
    return  myObject.signedIn();
  }

  $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
    var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
    var user = $firebase(ref).$asObject();

    user.$loaded().then(function() {
      $rootScope.currentUser = user;
    });

    $location.path('/meetings');
  });

 $rootScope.$on('$firebaseSimpleLogin:logout', function (e, authUser) {
    $rootScope.currentUser = {};
  });

  //push temp object to Authentication factory 
  return myObject;
}); //myApp.factory