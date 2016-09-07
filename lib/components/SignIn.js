import React from 'react'
import ActionButton from './ActionButton'

class SignIn extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.initFirebase();
  }

  handleClick() {
    this.signIn();
  }

  initFirebase() {
    // Shortcuts to Firebase SDK features.
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
    // Initiates Firebase auth and listen to auth state changes.
    // this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
  };

  signIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider);
  };

  signOut() {
    this.auth.signOut();
    console.log('you signed out');
  };

  render () {
    return (
      <section>
        <ActionButton
          handleClick={this.handleClick}
          text="LOGIN WITH GOOGLE"
        />
      </section>
    )
  }
}

export default SignIn
