import React from 'react'
const firebase = require('../firebase');
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

class SignInScreen extends React.Component {

  render() {
    return (
      <div id="signin-screen">
        <h1
          className="welcome-title-sign-in">
          Beer Funds
        </h1>

        <img className="beermug" src='../../imgs/beermug.png'/>

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
