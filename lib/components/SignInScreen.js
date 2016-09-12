import React from 'react'
const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

class SignInScreen extends React.Component {

  render() {
    return (
      <div>
      <button
       onClick={this.props.signIn}
       className="google-login">
       Sign In With Google
      </button>
      </div>
    )
  }
}

export default SignInScreen;
