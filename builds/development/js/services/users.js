app.factory('User', function($firebase, FIREBASE_URL, Auth) {
  var firebaseRef = new Firebase(FIREBASE_URL + 'users');
  var users = $firebaseSimpleLogin(firebaseRef);

  var User = {
    create : function(authUser, userInfo) {
      
    }
  }


});