const $ = require('jquery')
const firebase = require('./firebase');

class Budget {
  constructor() {
    this.signInButton = $('#sign-in-with-google');
    this.signOutButton = $('#sign-out');

    this.messageForm = $('#message-form');
    this.messageInput = $('#message');
    this.submitButton = $('#submit');

    this.messageForm.on('submit', this.saveMessage.bind(this));

    this.signOutButton.on('click', this.signOut.bind(this));
    this.signInButton.on('click', this.signIn.bind(this));
    this.initFirebase();
  }

signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

signOut() {
  this.auth.signOut();
  console.log('you signed out');
};

initFirebase() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  // this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Saves a new message on the Firebase DB.
saveMessage(e) {
    this.messagesRef = this.database.ref();
    e.preventDefault();
      // Add a new message entry to the Firebase Database.
      this.messagesRef.push({
        text: this.messageInput.value,
    });
  };
 }

module.exports = Budget;
