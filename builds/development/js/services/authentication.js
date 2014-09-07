myApp.factory('Authentication',
  function($firebase, $firebaseSimpleLogin, FIREBASE_URL,
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
            firebaseUsers.$push(userInfo).then(function(ref) {
              userInfo.uid = ref.name();
              $rootScope.currentUser = userInfo;
            });
        }); //push user
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

  //push temp object to Authentication factory 
  return myObject;
}); //myApp.factory