import React from 'react'
import LoginButton from './ActionButton'
const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

class SignIn extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.signIn();
  }

  signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  signOut() {
    auth.signOut();
    console.log('you signed out');
  };

  render () {
    return (
      <section>
        <LoginButton
          handleClick={this.handleClick}
          text="LOGIN WITH GOOGLE"
        />
      </section>
    )
  }
}

// saveMessage(e) {
//     this.messagesRef = this.database.ref();
//     e.preventDefault();
//       // Add a new message entry to the Firebase Database.
//       this.messagesRef.push({
//         text: this.messageInput.value,
//     });
//   };

export default SignIn
