myApp.factory('Auth',
  function($firebaseSimpleLogin,
    FIREBASE_URL,
    $rootScope) {
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

    login: function(user) {
      return auth.$login("password", {
        email: user.email,
        password: user.password
      });
    }, //login

    logout: function() {
      return auth.$logout();
    }, //logout

  } // Auth

  $rootScope.signedIn = function() {
    return  Auth.signedIn();
  }
 
  return Auth;
}); //myApp.factory