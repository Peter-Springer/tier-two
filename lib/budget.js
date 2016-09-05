const firebase = require('./firebase');

function Budget() {
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  this.initFirebase();
}

Budget.prototype.signIn = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
}

Budget.prototype.signOut = function() {
  this.auth.signOut();
  console.log('you signed out')
};

Budget.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

module.exports = Budget;
