myApp.factory('Authentication',
  function($firebase, $firebaseSimpleLogin, $location, FIREBASE_URL,
    $rootScope) {

  var firebaseRef = new Firebase(FIREBASE_URL);
  var simpleLogin = $firebaseSimpleLogin(firebaseRef);

  var firebaseUsersRef = new Firebase(FIREBASE_URL + 'users');
  var firebaseUsers = $firebase(firebaseUsersRef);

  //Create temp object
  var myObject = {

    register: function(user) {
      var myDate = new Date().getTime();

      return simpleLogin.$createUser(
        user.email, user.password)
        .then(function(regUser) {
            var userInfo = {
                date: myDate,
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

  //push temp object to Authentication factory 
  return myObject;
}); //myApp.factory