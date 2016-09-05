const firebase = require('./firebase');

function Budget() {
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');
  this.sendButton = document.getElementById('send-button');
  // this.messagesRef = this.database.ref('messages');
  this.currentMessage = '';
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  this.sendButton.addEventListener('click', this.sendMessageToDatabase)
  this.initFirebase();
}

// Budget.prototype.sendMessageToDatabase = function() {
//   var message = this.getMessageValue();
//   this.messageRef.push({text: message});
// }

Budget.prototype.getMessageValue = function() {
  this.currentMessage = document.getElementById('message').value;
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



// Budget.prototype.saveMessage = function(e) {
//   // e.preventDefault();
//   // // Check that the user entered a message and is signed in.
//   // if (this.messageInput.value && this.checkSignedInWithMessage()) {
//   //   var currentUser = this.auth.currentUser;
//     // Add a new message entry to the Firebase Database.
//     // this.messagesRef = this.database.ref ('messages');
//     this.messagesRef.push({
//       // name: currentUser.displayName,
//       text: this.messageInput.value,
//       // photoUrl: currentUser.photoURL || '/images/profile_placeholder.png'
//     })
//       // Clear message text field and SEND button state.
//       // FriendlyChat.resetMaterialTextfield(this.messageInput);
//     //   this.toggleButton();
//     // }.bind(this)).catch(function(error) {
//     //   console.error('Error writing new message to Firebase Database', error);
//     // });
//   }
// };



















module.exports = Budget;
