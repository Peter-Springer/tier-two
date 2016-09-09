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
  }

  render () {
    return (
      <section>
      <h1 className="welcome-h1">Welcome to Beer Funds</h1>
        <LoginButton
          handleClick={this.handleClick}
          text="LOGIN WITH GOOGLE"
        />
      </section>
    )
  }
}


export default SignIn
