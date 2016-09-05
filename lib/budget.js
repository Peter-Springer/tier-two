'use strict';

const firebase = require('./firebase');

function Budget() {
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');

  this.messageForm = document.getElementById('message-form');
  this.messageInput = document.getElementById('message');
  this.submitButton = document.getElementById('submit');

  this.messageForm.addEventListener('submit', this.saveMessage.bind(this));

  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  this.initFirebase();
}

Budget.prototype.signIn = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

Budget.prototype.signOut = function() {
  this.auth.signOut();
  console.log('you signed out');
};

Budget.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  // this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Saves a new message on the Firebase DB.
Budget.prototype.saveMessage = function(e) {
    this.messagesRef = this.database.ref();
    e.preventDefault();
      // Add a new message entry to the Firebase Database.
      this.messagesRef.push({
        text: this.messageInput.value,
    });
};











module.exports = Budget;
