'use strict';
const $ = require('jquery');
const firebase = require('./firebase');


class UserAccount {
  constructor(){
    //I'm not sure the signInButton should be in the Budget class
    this.signInWithGoogleButton = $('#sign-in-with-google');
    // this.signOutButton = $('#sign-out');
    this.signInWithGoogleButton.on('click', this.signInWithGoogle.bind(this));
    // this.signOutButton.on('click', this.signOut.bind(this));
    this.initFirebase();
  }

  initFirebase() {
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
  }

  signInWithGoogle() {
    var google = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(google);
    this.currentUser = this.auth.currentUser.displayName;
  }

  signOut() {
    this.auth.signOut();
  }
}


module.exports = UserAccount
