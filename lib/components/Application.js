const firebase = require('../firebase');
import React from 'react'
import SignIn from './SignIn';
import Budget from './Budget';

class Application extends React.Component {
  constructor(){
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user });
    });
  }

  render() {

    if (this.state.user) {
      return (
        <div className="Main-Screen">
          <Budget />
        </div>
      );
    } else {
      return (
        <div className = "SignIn-Screen">
          <SignIn />
        </div>
      );
    }
  }


}


export default Application;