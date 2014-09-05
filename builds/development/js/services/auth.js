myApp.factory('Auth', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseSimpleLogin(ref);
  
  //Create our Auth object
  var Auth = {
    register: function(user) {
      return auth.$createUser(user.email, user.password);      
    }, //register
    signedIn: function() {
      return auth.user !== null;
    }, //signedin
    logout: function() {
      auth.$logout();
    }, //logout
  } // Auth

  $rootScope.signedIn = function() {
    return  Auth.signedIn();
  }
 
  return Auth;
}); //myApp.factory