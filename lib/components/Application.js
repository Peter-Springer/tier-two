import React from 'react';
import firebase from '../firebase';
import SignInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';
import SetBudget from './SetBudget';
import PurchasesList from './PurchasesList';
import database from '../references';
const _  = require('lodash');

const auth = firebase.auth();

class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      user: false,
      userBudget: null,
      onPurchasePage: false,
      remainingBudget: null
    };

    this.signIn = () => {
      let google = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(google);
    };

    this.goToPurchasesComponent = () => {
      this.setState({ onPurchasePage: true });
    };

    this.resetBudget = () => {
      this.setState({ userBudget: null });
    };
  }

  checkForUser() {
   auth.onAuthStateChanged((user) => {
     this.state.user = true;
   });
 }

  checkForBudget() {
   database.monthlyBudget.on('value', (snapshot) => {
     let budget = snapshot.val();
     if (budget) {
       let budgetValue = +budget.text;
       this.setState({ userBudget: budgetValue });
     }
   });
 }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ user });
      this.checkForBudget();
    });
  }

  render() {
    if (this.state.onPurchasePage) {
      return (
      <PurchasesList
        goBackToBudget={() => this.setState({ onPurchasePage: false })}
      />
      )
    }

    if (this.state.userBudget) {
      return (
        <HomeScreen
          userDisplayName={auth.currentUser.displayName}
          userBudget={this.state.userBudget}
          goToPurchasesComponent={this.goToPurchasesComponent}
          resetBudget={this.resetBudget}
        />
      )
    }

    if (this.state.user) {
      return (
       <SetBudget />
      )
    }

    return (
      <SignInScreen
        signIn={this.signIn}
      />
    )
  }
}

export default Application;
